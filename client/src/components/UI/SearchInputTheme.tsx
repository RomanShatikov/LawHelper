/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import { Autocomplete, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import type { ThemeType } from '../../types/theme/themeType';

export default function SearchInputTheme(): JSX.Element {
  const themes = useAppSelector<ThemeType[]>((state) => state.theme.themes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [themesInInput, setThemesInInput] = React.useState([]);
  const [input, setInput] = React.useState('');

  React.useEffect(() => {
    axios('/preSearchTheme')
      .then((res) => setThemesInInput(res.data))
      .catch((e) => console.log(e));
  }, []);
  console.log(themesInInput);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      axios
        .post('/intualSearchTheme', { title: input })
        .then((res) => setThemesInInput(res.data))
        .catch((e) => console.log(e));
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [input]);

  console.log(themesInInput);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate(`/theme/${input}`);
  };

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <Autocomplete
        id="free-solo-demo"
        selectOnFocus
        clearOnBlur
        freeSolo
        options={themesInInput.map((option) => option.title)}
        onInputChange={(event, newInputValue) => {
          setInput(newInputValue);
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="Тема" name="title" />}
      />
      <Button type="submit" variant="contained">
        Найти
      </Button>
    </form>
  );
}
