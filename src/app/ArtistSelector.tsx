"use client";

import { useAppSelector } from "@/lib/hooks";
import type { ArtistSearchResult } from "@/lib/models";
import { useGuessArtistMutation } from "@/lib/state/api";
import { trpcClient } from "@/lib/trpc";
import {
  Autocomplete,
  Box,
  CircularProgress,
  type AutocompleteRenderInputParams as InputParams,
  TextField,
  Typography,
} from "@mui/material";
import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import React, { type ReactNode } from "react";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  mergeMap,
} from "rxjs";

const [textChange$, setText] = createSignal<string>();
const [useArtistList, artistList$] = bind<ArtistSearchResult[]>(
  textChange$.pipe(
    filter((txt) => txt?.length > 3),
    debounceTime(300),
    mergeMap((x) => trpcClient.artists.searchArtist.query(x)),
  ),
  [],
);

const [useLoading] = bind(
  merge(
    textChange$.pipe(map((txt) => txt.length > 3)),
    artistList$.pipe(map(() => false)),
  ).pipe(distinctUntilChanged()),
  false,
);

function ArtistSelectorInput(params: InputParams): ReactNode {
  const loading = useLoading();
  return (
    <TextField
      {...params}
      slotProps={{
        input: {
          ...params.InputProps,
          endAdornment: (
            <>
              {loading && <CircularProgress size={20} />}
              {params.InputProps.endAdornment}
            </>
          ),
        },
      }}
      label="Artist"
    />
  );
}

function ArtistAutoComplete() {
  const options = useArtistList();
  const loading = useLoading();
  const [guessArtist, { isLoading }] = useGuessArtistMutation();
  const totalGuesses = useAppSelector((s) => s.guesses.guesses.length);

  return (
    <>
      <Autocomplete
        id="free-solo-demo"
        options={options}
        renderInput={ArtistSelectorInput}
        getOptionLabel={(x: string | ArtistSearchResult) => {
          if (typeof x === "string") return x;
          return x.name;
        }}
        noOptionsText="Artist not found"
        loadingText="Loading artists..."
        onInputChange={(_ev, val, reason) =>
          reason !== "selectOption" && setText(val)
        }
        isOptionEqualToValue={(opt, val) => opt.id === val.id}
        onChange={(_ev, val) => val && guessArtist(val)}
        loading={loading || isLoading}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.id}>
            {option.name}
          </Box>
        )}
        selectOnFocus
        clearOnBlur
        fullWidth
        handleHomeEndKeys
      />
      <Typography width="100%" align="right">
        Guesses: {totalGuesses}/10
      </Typography>
    </>
  );
}

export default ArtistAutoComplete;
