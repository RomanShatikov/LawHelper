import { Autocomplete, Stack, TextField } from '@mui/material';
import React from 'react';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
];

export default function SearchInputTheme(): JSX.Element {
  return (
    <Stack>
      <Autocomplete
        id="free-solo-demo"
        selectOnFocus
        clearOnBlur
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="Тема" />}
      />
    </Stack>
  );
}
