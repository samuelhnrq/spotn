"use client";

import { useGuesses } from "@/lib/hooks";
import type { ArtistSearchResult } from "@/lib/models";
import { api as queryTrpc } from "@/trpc/react";
import {
  Autocomplete,
  Box,
  CircularProgress,
  type AutocompleteRenderInputParams as InputParams,
  TextField,
  Typography,
  debounce,
} from "@mui/material";
import { atom, useAtom } from "jotai";
import type React from "react";
import {
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

const loadingAtom = atom(false);

function ArtistSelectorInput(params: InputParams): ReactNode {
  const [isLoading] = useAtom(loadingAtom);
  return (
    <TextField
      {...params}
      slotProps={{
        input: {
          ...params.InputProps,
          endAdornment: (
            <>
              {isLoading && <CircularProgress size={20} />}
              {params.InputProps.endAdornment}
            </>
          ),
        },
      }}
      label="Artist"
    />
  );
}

function useSearch() {
  const [searched, setSearched] = useState<string>("");
  const result = queryTrpc.artists.searchArtist.useQuery(searched);
  const [, setLoading] = useAtom(loadingAtom);
  useEffect(() => {
    setLoading(result.isLoading);
  }, [result.isLoading, setLoading]);
  const debounced = useCallback(
    debounce((val: string) => {
      setSearched(val);
    }, 500),
    [],
  );
  const changeValue = useCallback(
    (val: string) => {
      setLoading(!!val);
      debounced(val);
    },
    [debounced, setLoading],
  );
  return [changeValue, result] as const;
}

const RightTypography: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Typography width="100%" align="right">
      {children}
    </Typography>
  );
};

const GuessesRemaining: React.FC = () => {
  const [data] = useGuesses();
  return <RightTypography>Guesses: {data.length}/10</RightTypography>;
};

function ArtistAutoComplete() {
  const utils = queryTrpc.useUtils();
  const { mutate: guessArtist } = queryTrpc.artists.guessArtist.useMutation({
    onSettled: () => {
      utils.artists.listGuesses.invalidate();
    },
  });
  const [setSearch, { data: options = [], isLoading }] = useSearch();

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
          reason !== "selectOption" && setSearch(val)
        }
        isOptionEqualToValue={(opt, val) => opt.id === val.id}
        onChange={(_ev, val) => val && guessArtist(val.id)}
        loading={isLoading}
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
      <GuessesRemaining />
    </>
  );
}

export default ArtistAutoComplete;
