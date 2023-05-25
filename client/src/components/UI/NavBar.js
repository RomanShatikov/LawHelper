"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var reactstrap_1 = require("reactstrap");
var hooks_1 = require("../../features/hooks");
var thunkActions_1 = require("../../features/redux/slices/user/thunkActions");
function NavBar(args) {
    var _a = (0, react_1.useState)(false), isOpen = _a[0], setIsOpen = _a[1];
    var toggle = function () { return setIsOpen(!isOpen); };
    var dispatch = (0, hooks_1.useAppDispatch)();
    var user = (0, hooks_1.useAppSelector)(function (state) { return state.user; });
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <reactstrap_1.Navbar className="NavBar" color="dark" container="fluid" dark="true" {...args}>
      <reactstrap_1.NavbarBrand href="/">LawHelper</reactstrap_1.NavbarBrand>
      <reactstrap_1.NavbarToggler onClick={toggle}/>
      <reactstrap_1.Collapse isOpen={isOpen} navbar>
        <reactstrap_1.Nav className="me-auto" navbar>
          <reactstrap_1.NavItem>
            {user.status === 'active' && (<react_router_dom_1.NavLink className="nav-link" to="/cabinet/requests">
                Личный кабинет
              </react_router_dom_1.NavLink>)}
          </reactstrap_1.NavItem>
          <reactstrap_1.NavItem>
            <react_router_dom_1.NavLink className="nav-link" to="/">
              Главная
            </react_router_dom_1.NavLink>
          </reactstrap_1.NavItem>
          {user.status === 'guest' && (<>
              <reactstrap_1.NavItem>
                <react_router_dom_1.NavLink className="nav-link" to="/signup">
                  Зарегистрироваться
                </react_router_dom_1.NavLink>
              </reactstrap_1.NavItem>
              <reactstrap_1.NavItem>
                <react_router_dom_1.NavLink className="nav-link" to="/login">
                  Войти
                </react_router_dom_1.NavLink>
              </reactstrap_1.NavItem>
            </>)}
          <reactstrap_1.NavItem>
            <react_router_dom_1.NavLink className="nav-link" to="/theme">
              Темы
            </react_router_dom_1.NavLink>
          </reactstrap_1.NavItem>
          {user.status === 'active' && (<>
              <reactstrap_1.NavItem>
                <react_router_dom_1.NavLink className="nav-link" to="/" onClick={function () { return dispatch((0, thunkActions_1.logoutThunk)()); }}>
                  Выйти
                </react_router_dom_1.NavLink>
              </reactstrap_1.NavItem>
              {user.isAdmin && (<reactstrap_1.NavItem>
                  <react_router_dom_1.NavLink className="nav-link" to="/admin">
                    Мой кабинет
                  </react_router_dom_1.NavLink>
                </reactstrap_1.NavItem>)}
            </>)}
          <reactstrap_1.NavItem>
            <react_router_dom_1.NavLink className="nav-link" to="/question">
              Страница вопросов
            </react_router_dom_1.NavLink>
          </reactstrap_1.NavItem>
          <reactstrap_1.NavItem>
            <react_router_dom_1.NavLink className="nav-link" to="/answer">
              Страница ответов
            </react_router_dom_1.NavLink>
          </reactstrap_1.NavItem>
        </reactstrap_1.Nav>
      </reactstrap_1.Collapse>
    </reactstrap_1.Navbar>);
}
exports["default"] = NavBar;
