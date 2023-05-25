"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
function PrivateRoute(_a) {
    var isAllowed = _a.isAllowed, _b = _a.redirectPath, redirectPath = _b === void 0 ? '/' : _b, children = _a.children;
    if (!isAllowed) {
        return <react_router_dom_1.Navigate to={redirectPath} replace/>;
    }
    return children || <react_router_dom_1.Outlet />;
}
exports["default"] = PrivateRoute;
