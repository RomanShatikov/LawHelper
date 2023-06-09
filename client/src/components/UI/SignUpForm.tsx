import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { signUpThunk } from '../../features/redux/slices/user/thunkActions';
import type { SignUpFormType } from '../../types/user/formTypes';

export default function SignUpForm(): JSX.Element {
  const erors = useAppSelector((state) => state.eror);
  console.log(erors);
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [isVisible, setVisible] = useState(false);
  const [isRepeatVisible, setRepeatVisible] = useState(false);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.value) setError((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  function validatePassword(password: string, repeatPassword: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password === '') {
      setError((prev) => ({ ...prev, password: 'Введите пароль' }));
      return false;
    }
    if (!regex.test(password)) {
      setError((prev) => ({
        ...prev,
        password:
          'Введите пароль длинной минимум восемь символов, содержащий минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ:',
      }));
      return false;
    }
    if (password !== repeatPassword) {
      setError((prev) => ({
        ...prev,
        password: 'Пароли не совпадают, попробуйте еще раз',
      }));
      return false;
    }
    return true;
  }

  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!input.firstName) {
      setError((prev) => ({ ...prev, firstName: 'Введите имя' }));
    }
    if (!input.lastName) {
      setError((prev) => ({ ...prev, lastName: 'Введите фамилию' }));
    }
    if (!input.email) {
      setError((prev) => ({ ...prev, email: 'Введите email' }));
    }
    if (!input.repeatPassword) {
      setError((prev) => ({ ...prev, repeatPassword: 'Введите пароль повторно' }));
    }
    if (
      validatePassword(input.password, input.repeatPassword) &&
      input.email &&
      input.firstName &&
      input.lastName
    ) {
      const data = Object.fromEntries(new FormData(e.currentTarget)) as SignUpFormType;
      dispatch(signUpThunk(data));
      alert('Проверьте почту');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src="../../../public/logo.png" width={'70px'} alt="logo" />
        <Typography component="h1" variant="h5">
          Зарегистрироваться
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Имя"
                value={input.firstName || ''}
                onChange={inputHandler}
                autoFocus
              />
              {error.firstName && <p>{error.firstName}</p>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Фамилия"
                name="lastName"
                value={input.lastName || ''}
                onChange={inputHandler}
                autoComplete="family-name"
              />
              {error.lastName && <p>{error.lastName}</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={input.email || ''}
                onChange={inputHandler}
                autoComplete="email"
              />
              {error.email && <p>{error.email}</p>}
              {erors.EmailEror && <p>{erors.EmailEror}</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Введите пароль"
                type={isVisible ? 'text' : 'password'}
                id="password"
                value={input.password || ''}
                onChange={inputHandler}
                autoComplete="new-password"
              />
              <button
                type="button"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#3F88CC',
                  padding: '0',
                }}
                onClick={() => setVisible(!isVisible)}
              >
                <VisibilityIcon style={{ color: '#3F88CC' }} />
              </button>
              {error.password && <p>{error.password}</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="repeatPassword"
                label="Повторите пароль"
                type={isRepeatVisible ? 'text' : 'password'}
                id="repeatPassword"
                value={input.repeatPassword || ''}
                onChange={inputHandler}
                autoComplete="new-password"
              />
              <button
                type="button"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#3F88CC',
                  padding: '0',
                }}
                onClick={() => setRepeatVisible(!isRepeatVisible)}
              >
                <VisibilityIcon style={{ color: '#3F88CC' }} />
              </button>
              {error.repeatPassword && <p>{error.repeatPassword}</p>}
            </Grid>
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Зарегистрироваться
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Уже есть аккаунт? Войдите
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
