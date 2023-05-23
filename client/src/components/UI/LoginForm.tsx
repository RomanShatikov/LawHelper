import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Input, Label } from 'reactstrap';
import { loginUserThunk } from '../../features/redux/slices/user/thunkActions';
import type { LoginForm } from '../../types/user/formTypes';

export default function LogForm(): JSX.Element {
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as LoginForm;
    dispatch(loginUserThunk(data));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input id="exampleEmail" name="email" type="email" />
        {errorEmail && <p>{errorEmail}</p>}
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input id="examplePassword" name="password" type="password" />
        {errorPassword && <p>{errorPassword}</p>}
      </FormGroup>
      <Button type="submit">Войти</Button>
    </Form>
  );
}
