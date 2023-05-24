import { Link } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { logoutThunk } from '../../features/redux/slices/user/thunkActions';

export default function NavBar(args: any): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  return (
    <div
      style={{ backgroundColor: '#0b4ba6', height: '98px' }}
      className="d-flex justify-content-between align-items-center"
    >
      <Navbar
        style={{ fontSize: '18px', color: 'white' }}
        className="container d-flex justify-content-between align-items-center"
      >
        <div className="logo">
          <Link href="/">
            <img src="logo.png" alt="logo" />
          </Link>
        </div>
        <NavbarBrand style={{ fontSize: '30px', color: 'white' }} href="/">
          LawHelper
        </NavbarBrand>
        {user.status === 'active' && (
          <NavLink className="nav-link" to="/cabinet/requests">
            <HomeIcon fontSize="large" color="disabled" />
          </NavLink>
        )}

        {/* <NavLink className="nav-link" to="/">
              </NavLink> */}
        {user.status === 'guest' && (
          <>
            <NavLink className="nav-link" to="/signup">
              Зарегистрироваться
              <LoginIcon fontSize="large" style={{color:"white"}} />
            </NavLink>
            <NavLink className="nav-link" to="/login">
              Войти
              <FingerprintIcon fontSize="large" style={{color:"white"}} />
            </NavLink>
          </>
        )}
        <NavLink className="nav-link" to="/theme">
          Тематика
          <ContentPasteIcon fontSize="large" style={{color:"white"}} />
        </NavLink>
        {user.status === 'active' && (
          <>
            <NavLink className="nav-link" to="/" onClick={() => dispatch(logoutThunk())}>
              <LogoutIcon fontSize="large" style={{color:"white"}} />
            </NavLink>
            {user.isAdmin && (
              <NavLink className="nav-link" to="/admin">
                <HomeIcon fontSize="large" style={{color:"white"}} />
              </NavLink>
            )}
          </>
        )}
        <NavLink className="nav-link" to="/question">
          Страница вопросов
          <QuizIcon fontSize="large" style={{color:"white"}} />
        </NavLink>
        <NavLink className="nav-link" to="/answer">
          Страница ответов
        </NavLink>
      </Navbar>
      <hr style={{ margin: '0', borderTop: '1px solid #ccc', color: 'black' }} />
    </div>
  );
}
