"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = require("react");
var hooks_1 = require("../../features/hooks");
function Loader(_a) {
    var children = _a.children;
    var user = (0, hooks_1.useAppSelector)(function (store) { return store.user; });
    // if (user.status === 'guest') return <h1>LOADING...</h1>;
    if (user.status === 'fetching') {
        return (<div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh'
            }}>
        <material_1.CircularProgress />
      </div>);
    }
    return children;
}
exports["default"] = Loader;
