import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { logoutThunk } from '../../features/redux/slices/user/thunkActions';
import { UserType } from '../../types/user/userType';

export default function NavBar(args: any): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (): void => setIsOpen(!isOpen);
  const dispatch = useAppDispatch();
  const user = useAppSelector<UserType>((state) => state.user);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Navbar className="NavBar" color="dark" container="fluid" dark="true" {...args}>
      <NavbarBrand href="/">LawHelper</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            {user.status === 'active' && (
              <NavLink className="nav-link" to="/cabinet/requests">
                Личный кабинет
              </NavLink>
            )}
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/">
              Главная
            </NavLink>
          </NavItem>
          {user.status === 'guest' && (
            <>
              <NavItem>
                <NavLink className="nav-link" to="/signup">
                  Зарегистрироваться
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/login">
                  Войти
                </NavLink>
              </NavItem>
            </>
          )}
          <NavItem>
            <NavLink className="nav-link" to="/theme">
              Темы
            </NavLink>
          </NavItem>
          {user.status === 'active' && (
            <>
              <NavItem>
                <NavLink className="nav-link" to="/" onClick={() => dispatch(logoutThunk())}>
                  Выйти
                </NavLink>
              </NavItem>
              {user.isAdmin && (
                <NavItem>
                  <NavLink className="nav-link" to="/admin">
                    Мой кабинет
                  </NavLink>
                </NavItem>
              )}
            </>
          )}
          <NavItem>
            <NavLink className="nav-link" to="/question">
              Страница вопросов
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/answer">
              Страница ответов
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
