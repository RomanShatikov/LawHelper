import { BottomNavigation, BottomNavigationAction, Link } from '@mui/material';
import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LogoutIcon from '@mui/icons-material/Logout';
import BalanceIcon from '@mui/icons-material/Balance';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { logoutThunk } from '../../features/redux/slices/user/thunkActions';
import type { UserType } from '../../types/user/userType';
import { Avatar } from '@mui/material';

export default function NavBar(args: any): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector<UserType>((state) => state.user);
  const navigate = useNavigate();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Navbar
      style={{
        backgroundColor: 'white',
        height: '98px',
        display: 'flex',
        justifyItems: 'center',
        justifyContent: 'space-around',
        gap: '10%',
        alignItems: 'center',
        margin: '0',
      }}
      className="container d-flex justify-content-between align-items-center"
    >
      <BottomNavigation
        style={{
          backgroundColor: 'white',
          height: '98px',
          display: 'flex',
          justifyItems: 'center',
          justifyContent: 'space-between',
          gap: '20%',
          alignItems: 'center',
          margin: 'auto',
        }}
        sx={{ width: 500 }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          onClick={() => navigate('/')}
          value="main"
          icon={<img src="../../../public/logo.png" alt="logo" width="50px" />}
        />
        {user.status === 'guest' && (
          <>
            <BottomNavigationAction
              onClick={() => navigate('/signup')}
              label="Зарегистрироваться"
              value="signup"
              icon={<LoginIcon fontSize="large" style={{ color: '#3F88CC' }} />}
            />
            <BottomNavigationAction
              onClick={() => navigate('/login')}
              label="Войти"
              value="login"
              icon={<FingerprintIcon fontSize="large" style={{ color: '#3F88CC' }} />}
            />
          </>
        )}
        <BottomNavigationAction
          onClick={() => navigate('/theme')}
          label="Темы"
          value="theme"
          icon={<BalanceIcon fontSize="large" style={{ color: '#3F88CC' }} />}
        />

        {user.status === 'active' && (
          <>
            <BottomNavigationAction
              href="/"
              onClick={() => {
                dispatch(logoutThunk());
                navigate('/');
              }}
              label="Выйти"
              value="logout"
              icon={<LogoutIcon fontSize="large" style={{ color: '#3F88CC' }} />}
            />
            {user.isAdmin && (
              <BottomNavigationAction
                onClick={() => navigate('/admin')}
                label="Кабинет администратора"
                value="admin"
                icon={<AdminPanelSettingsIcon fontSize="large" style={{ color: '#3F88CC' }} />}
              />
            )}
          </>
        )}
        <BottomNavigationAction
          onClick={() => navigate('/question')}
          label="Вопросы"
          value="question"
          icon={<QuestionMarkIcon fontSize="large" style={{ color: '#3F88CC' }} />}
        />
        {user.status === 'active' && (
          <BottomNavigationAction
            onClick={() => navigate('/cabinet/requests')}
            label="Личный кабинет"
            value="folder"
            icon={
              <Avatar sx={{ bgcolor: '#3F88CC' }}>
                {user?.firstName[0]}
                {user?.lastName[0]}
              </Avatar>
            }
          />
        )}
      </BottomNavigation>
    </Navbar>
  );
}
