"use strict";
exports.__esModule = true;
var react_1 = require("react");
var LoginForm_1 = require("../UI/LoginForm");
var hooks_1 = require("../../features/hooks");
function LoginPage() {
    var user = (0, hooks_1.useAppSelector)(function (state) { return state.user; });
    return (<>
      <LoginForm_1["default"] />
      {user.status === 'non-active' && <p>Подтвердите почту</p>}
    </>);
}
exports["default"] = LoginPage;
