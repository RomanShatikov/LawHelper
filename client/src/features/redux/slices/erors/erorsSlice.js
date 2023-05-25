"use strict";
var _a;
exports.__esModule = true;
exports.setPasswordEror = exports.setEmailEror = exports.erorsSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    EmailEror: '',
    loginPasswordEror: ''
};
exports.erorsSlice = (0, toolkit_1.createSlice)({
    name: 'eror',
    initialState: initialState,
    reducers: {
        setEmailEror: function (state, action) {
            state.EmailEror = action.payload;
        },
        setPasswordEror: function (state, action) {
            state.loginPasswordEror = action.payload;
        }
    }
});
exports.setEmailEror = (_a = exports.erorsSlice.actions, _a.setEmailEror), exports.setPasswordEror = _a.setPasswordEror;
exports["default"] = exports.erorsSlice.reducer;
