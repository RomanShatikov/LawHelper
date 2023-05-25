import { BottomNavigation, BottomNavigationAction, Link } from '@mui/material';
import * as React from 'react';
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
import { Fingerprint } from '@mui/icons-material';

export default function NavBar(args: any): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
        <BottomNavigation
          style={{ backgroundColor: '#0b4ba6', height: '98px' }}
          sx={{ width: 500 }}
          // style={{ fontSize: '18px', color: 'white' }}
          value={value}
          onChange={handleChange}
        >
          {user.status === 'guest' && (
            <>
              <BottomNavigationAction
                href="/signup"
                label="Зарегистрироваться"
                value="favorites"
                icon={<LoginIcon fontSize="large" style={{ color: 'white' }} />}
              />
              <BottomNavigationAction
                href="/login"
                label="Войти"
                value="nearby"
                icon={<FingerprintIcon fontSize="large" style={{ color: 'white' }} />}
              />
            </>
          )}
          <BottomNavigationAction
            href="/theme"
            label="Folder"
            value="folder"
            icon={<ContentPasteIcon fontSize="large" style={{ color: 'white' }} />}
          />

          {user.status === 'active' && (
            <>
              <BottomNavigationAction
                href="/"
                onClick={() => dispatch(logoutThunk())}
                label="Folder"
                value="folder"
                icon={<LogoutIcon fontSize="large" style={{ color: 'white' }} />}
              />
              {user.isAdmin && (
                <BottomNavigationAction
                  href="/admin"
                  label="Recents"
                  value=""
                  icon={<HomeIcon fontSize="large" style={{ color: 'white' }} />}
                />
              )}
            </>
          )}
          <BottomNavigationAction
            href="/question"
            label="Folder"
            value="folder"
            icon={<QuizIcon fontSize="large" style={{ color: 'white' }} />}
          />
          {user.status === 'active' && (
            <BottomNavigationAction
              href="/cabinet/requests"
              label="Folder"
              value="folder"
              icon={<QuizIcon fontSize="large" style={{ color: 'white' }} />}
            />
          )}
        </BottomNavigation>
      </Navbar>
      {/* {user.status === 'active' && (
          <NavLink className="nav-link" to="/cabinet/requests">
            <HomeIcon fontSize="large" color="disabled" />
          </NavLink>
        )}  */}

      {/* <NavLink className="nav-link" to="/">
              </NavLink> */}
      {/* {user.status === 'guest' && (
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
      </Navbar> */}
      <hr style={{ margin: '0', borderTop: '1px solid #ccc', color: 'black' }} />
    </div>
  );
}
