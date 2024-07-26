"use client";

import {
  Autocomplete,
  type AutocompleteRenderInputParams as InputParams,
  TextField,
} from "@mui/material";
import React, { type ReactNode } from "react";

function ArtistSelectorInput(params: InputParams): ReactNode {
  return <TextField {...params} fullWidth label="Artist" />;
}

function ArtistSelector() {
  return (
    <Autocomplete
      id="free-solo-demo"
      options={[]}
      renderInput={ArtistSelectorInput}
      selectOnFocus
      freeSolo
      clearOnBlur
      fullWidth
      handleHomeEndKeys
    />
  );
}

export default ArtistSelector;
