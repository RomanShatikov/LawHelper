"use strict";
var _a;
exports.__esModule = true;
exports.logoutUser = exports.setUser = exports.userSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
// Define the initial state using that type
var initialState = {
    status: 'fetching'
};
exports.userSlice = (0, toolkit_1.createSlice)({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: function (state, action) { return action.payload; },
        logoutUser: function (state, action) { return ({
            status: action.payload
        }); }
    }
});
exports.setUser = (_a = exports.userSlice.actions, _a.setUser), exports.logoutUser = _a.logoutUser;
exports["default"] = exports.userSlice.reducer;
