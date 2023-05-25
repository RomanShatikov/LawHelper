import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { Input, Label } from 'reactstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Typography } from '@mui/material';
import { loginUserThunk } from '../../features/redux/slices/user/thunkActions';
import type { LoginForm } from '../../types/user/formTypes';
import { useAppDispatch, useAppSelector } from '../../features/hooks';

export default function LogForm(): JSX.Element {
  const erors = useAppSelector((state) => state.eror);
  console.log(erors);
  const [isVisible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as LoginForm;
    dispatch(loginUserThunk(data));
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{ width: '30%', height: '30%', margin: 'auto', marginTop: '10%' }}
    >
      <Typography gutterBottom variant="h5" component="div">
        Вход
      </Typography>
      <FormGroup>
        <Input
          id="exampleEmail"
          label="E-mail"
          name="email"
          type="email"
          style={{ marginTop: '10px' }}
        />
        {erors.EmailEror && <p>{erors.EmailEror}</p>}
      </FormGroup>

      <FormGroup>
        <Input
          id="examplePassword"
          name="password"
          label="Пароль"
          style={{ marginTop: '10px' }}
          type={isVisible ? 'text' : 'password'}
        />
        <button
          type="button"
          onClick={() => setVisible(!isVisible)}
          style={{ backgroundColor: 'transparent', border: 'none', color: '#fff' }}
        >
          <VisibilityIcon style={{ color: '#3F88CC' }} />
        </button>
        {erors.loginPasswordEror && <p>{erors.loginPasswordEror}</p>}
      </FormGroup>
      <Button
        type="submit"
        style={{ backgroundColor: '#3F88CC', border: 'none', color: 'white', marginTop: '10px' }}
      >
        Войти
      </Button>
    </Form>
  );
}
