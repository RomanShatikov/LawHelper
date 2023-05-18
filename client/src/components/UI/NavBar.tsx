import React, { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

export default function NavBar(args: any): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="NavBar" color="dark" container="fluid" dark="true" {...args}>
        <NavbarBrand href="/">LawHelper</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" to="/cabinet">
                Личный кабинет
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/">
                Главная
              </NavLink>
            </NavItem>
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
            <NavItem>
              <NavLink className="nav-link" to="/theme">
                Темы
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/logout">
                Выйти
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/admin">
                Мой кабинет
              </NavLink>
            </NavItem>
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
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
