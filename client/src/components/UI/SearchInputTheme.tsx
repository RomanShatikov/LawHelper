/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import { Autocomplete, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import type { ThemeType } from '../../types/theme/themeType';

type ThemeFromBackend = {
  title: string;
  id: number;
};

export default function SearchInputTheme(): JSX.Element {
  const themes = useAppSelector<ThemeType[]>((state) => state.theme.themes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [themesInInput, setThemesInInput] = React.useState<ThemeFromBackend[]>([]);
  const [input, setInput] = React.useState<string>('');

  React.useEffect(() => {
    axios('/preSearchTheme')
      .then((res) => setThemesInInput(res.data))
      .catch((e) => console.log(e));
  }, []);

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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate(`/themes/${input}`);
  };

  return (
    <form onSubmit={(e) => submitHandler(e)} style={{ width: '100%' }}>
      <div style={{ width: '100%', marginTop: '2%' }}>
        <Autocomplete
          id="free-solo-demo"
          selectOnFocus
          clearOnBlur
          freeSolo
          style={{ width: '100%' }}
          options={themesInInput.map((option) => ({ label: option.title, id: option.id }))}
          onInputChange={(event, newInputValue) => {
            setInput(newInputValue);
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                style: {
                  color: 'black',
                  backgroundColor: 'white',
                  width: '100%',
                },
              }}
              label="Введите тему"
              name="title"
              style={{ borderRadius: '10px' }}
            />
          )}
        />
      </div>
    </form>
  );
}
