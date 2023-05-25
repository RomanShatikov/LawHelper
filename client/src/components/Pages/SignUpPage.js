"use strict";
exports.__esModule = true;
var react_1 = require("react");
var SignUpForm_1 = require("../UI/SignUpForm");
var hooks_1 = require("../../features/hooks");
function SignUpPage() {
    var user = (0, hooks_1.useAppSelector)(function (state) { return state.user; });
    return (<>
      <SignUpForm_1["default"] />
      {user.status === 'non-active' && <p>Подтвердите почту</p>}
    </>);
}
exports["default"] = SignUpPage;
