"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var reactstrap_1 = require("reactstrap");
var Visibility_1 = require("@mui/icons-material/Visibility");
var thunkActions_1 = require("../../features/redux/slices/user/thunkActions");
var hooks_1 = require("../../features/hooks");
function LogForm() {
    var erors = (0, hooks_1.useAppSelector)(function (state) { return state.eror; });
    console.log(erors);
    var _a = (0, react_1.useState)(false), isVisible = _a[0], setVisible = _a[1];
    var dispatch = (0, hooks_1.useAppDispatch)();
    var handleSubmit = function (e) {
        e.preventDefault();
        var data = Object.fromEntries(new FormData(e.currentTarget));
        dispatch((0, thunkActions_1.loginUserThunk)(data));
    };
    return (<react_bootstrap_1.Form onSubmit={handleSubmit}>
      <react_bootstrap_1.FormGroup>
        <reactstrap_1.Label for="exampleEmail">Email</reactstrap_1.Label>
        <reactstrap_1.Input id="exampleEmail" name="email" type="email"/>
        {erors.EmailEror && <p>{erors.EmailEror}</p>}
      </react_bootstrap_1.FormGroup>

      <react_bootstrap_1.FormGroup>
        <reactstrap_1.Label for="examplePassword">Password</reactstrap_1.Label>
        <reactstrap_1.Input id="examplePassword" name="password" type={isVisible ? 'text' : 'password'}/>
        <button type="button" onClick={function () { return setVisible(!isVisible); }}>
          <Visibility_1["default"] />
        </button>
        {erors.loginPasswordEror && <p>{erors.loginPasswordEror}</p>}
      </react_bootstrap_1.FormGroup>
      <react_bootstrap_1.Button type="submit">Войти</react_bootstrap_1.Button>
    </react_bootstrap_1.Form>);
}
exports["default"] = LogForm;
