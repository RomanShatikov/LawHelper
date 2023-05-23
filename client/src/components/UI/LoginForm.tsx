import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Input, Label } from 'reactstrap';
import { loginUserThunk } from '../../features/redux/slices/user/thunkActions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { LoginForm } from '../../types/user/formTypes';
import { useAppSelector } from '../../features/hooks';

export default function LogForm(): JSX.Element {
  const erors = useAppSelector((state) => state.eror);
  console.log(erors);
  const [isVisible, setVisible] = useState(false);
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
        {erors.loginEmailEror && <p>{erors.loginEmailEror}</p>}
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input id="examplePassword" name="password" type={isVisible ? 'text' : 'password'} />
        <button type="button" onClick={() => setVisible(!isVisible)}>
          <VisibilityIcon />
        </button>
        {erors.loginPasswordEror && <p>{erors.loginPasswordEror}</p>}
      </FormGroup>
      <Button type="submit">Войти</Button>
    </Form>
  );
}
