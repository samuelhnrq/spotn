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
import type React from "react";
import {
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useLoading } from "./state";
import { useAtom, atom } from "jotai";

const searchPendingAtom = atom(false);

function ArtistSelectorInput(params: InputParams): ReactNode {
  const [isLoading] = useAtom(searchPendingAtom);
  const [touched, setTouched] = useState(false);
  return (
    <TextField
      {...params}
      slotProps={{
        input: {
          ...params.InputProps,
          endAdornment: (
            <>
              {touched && isLoading && <CircularProgress size={20} />}
              {params.InputProps.endAdornment}
            </>
          ),
        },
      }}
      onFocus={() => setTouched(true)}
      label="Artist"
    />
  );
}

function useSearch() {
  const [searched, setSearched] = useState<string>("");
  const result = queryTrpc.artists.searchArtist.useQuery(searched);
  const [, setPending] = useAtom(searchPendingAtom);
  useEffect(() => {
    setPending(result.isLoading);
  }, [result.isLoading, setPending]);
  const debounced = useCallback(
    debounce((val: string) => {
      setSearched(val);
    }, 100),
    [],
  );
  const changeValue = useCallback(
    (val: string) => {
      setPending(result.isLoading);
      debounced(val);
    },
    [result.isLoading, debounced, setPending],
  );
  return [searched, changeValue, result] as const;
}

const RightTypography: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Typography width="100%" align="right">
      {children}
    </Typography>
  );
};

const GuessesRemaining: React.FC = () => {
  const { data = [] } = useGuesses();
  return <RightTypography>Guesses: {data.length}/10</RightTypography>;
};

function ArtistAutoComplete() {
  const utils = queryTrpc.useUtils();
  const [value, setSearch, { data: options = [] }] = useSearch();
  const [, setLoading] = useLoading();
  const [pending] = useAtom(searchPendingAtom);
  const { mutate: guessArtist } = queryTrpc.artists.guessArtist.useMutation({
    onMutate() {
      setLoading(true);
    },
    onSettled: async () => {
      setSearch("");
      await utils.artists.listGuesses.invalidate();
    },
  });

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
        inputValue={value}
        isOptionEqualToValue={(opt, val) => opt.id === val.id}
        onChange={(_ev, val) => {
          if (val) {
            guessArtist(val.id);
            setSearch("");
          }
        }}
        loading={pending}
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
