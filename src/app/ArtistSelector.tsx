"use client";

import {
  Autocomplete,
  Box,
  CircularProgress,
  type AutocompleteRenderInputParams as InputParams,
  TextField,
} from "@mui/material";
import React, { type ReactNode } from "react";
import { searchArtist, type MbSearchResult } from "@/lib/mb-client";
import { createSignal } from "@react-rxjs/utils";
import { bind } from "@react-rxjs/core";
import {
  debounceTime,
  map,
  merge,
  mergeMap,
  distinctUntilChanged,
  filter,
} from "rxjs";
import { setSelectedArtist } from "@/lib/state";

const [textChange$, setText] = createSignal<string>();
const [useArtistList, artistList$] = bind(
  textChange$.pipe(
    filter((txt) => !!txt && txt.length > 3),
    debounceTime(1000),
    mergeMap((text) => searchArtist(text)),
  ),
  [],
);
const [useLoading] = bind(
  merge(
    textChange$.pipe(map((txt) => !!txt || txt.length > 3)),
    artistList$.pipe(map(() => false)),
  ).pipe(distinctUntilChanged()),
  false,
);

function ArtistAutoComplete() {
  const options = useArtistList();
  const loading = useLoading();
  function ArtistSelectorInput(params: InputParams): ReactNode {
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

  return (
    <Autocomplete
      id="free-solo-demo"
      options={options}
      renderInput={ArtistSelectorInput}
      getOptionLabel={(x: string | MbSearchResult) => {
        if (typeof x === "string") return x;
        else return x.name;
      }}
      noOptionsText="Artist not found"
      loadingText="Loading artists..."
      onInputChange={(_ev, val) => setText(val)}
      isOptionEqualToValue={(opt, val) => opt.mbid === val.mbid}
      onChange={(_ev, val) => val && setSelectedArtist(val)}
      loading={loading}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.mbid}>
          {option.name}
        </Box>
      )}
      selectOnFocus
      clearOnBlur
      fullWidth
      handleHomeEndKeys
    />
  );
}

function ArtistSelector() {
  return <ArtistAutoComplete />;
}

export default ArtistSelector;
