"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.logoutThunk = exports.checkUserThunk = exports.loginUserThunk = exports.signUpThunk = void 0;
var axios_1 = require("axios");
var userSlice_1 = require("./userSlice");
var erorsSlice_1 = require("../erors/erorsSlice");
var signUpThunk = function (formData) { return function (dispatch) {
    axios_1["default"]
        .post('/auth/signup', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
    })
        .then(function (_a) {
        var data = _a.data;
        return dispatch((0, userSlice_1.setUser)(__assign(__assign({}, data), { status: 'non-active' })));
    })["catch"](function (err) {
        var _a, _b, _c, _d;
        if (((_b = (_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) === 'e-mail уже зарегистрирован')
            dispatch((0, erorsSlice_1.setEmailEror)((_d = (_c = err === null || err === void 0 ? void 0 : err.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message));
    });
}; };
exports.signUpThunk = signUpThunk;
var loginUserThunk = function (formData) { return function (dispatch) {
    axios_1["default"]
        .post('/auth/login', formData)
        .then(function (_a) {
        var data = _a.data;
        return dispatch((0, userSlice_1.setUser)(__assign(__assign({}, data), { status: 'active' })));
    })["catch"](function (err) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (((_b = (_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) === 'e-mail не зарегистрирован')
            dispatch((0, erorsSlice_1.setEmailEror)((_d = (_c = err === null || err === void 0 ? void 0 : err.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message));
        if (((_f = (_e = err === null || err === void 0 ? void 0 : err.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.message) === 'Неверный пароль')
            dispatch((0, erorsSlice_1.setPasswordEror)((_h = (_g = err === null || err === void 0 ? void 0 : err.response) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.message));
        if (((_k = (_j = err === null || err === void 0 ? void 0 : err.response) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.message) === 'Пожалуйста подвердите свой e-mail')
            dispatch((0, erorsSlice_1.setEmailEror)((_m = (_l = err === null || err === void 0 ? void 0 : err.response) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.message));
    });
}; };
exports.loginUserThunk = loginUserThunk;
var checkUserThunk = function () { return function (dispatch) {
    axios_1["default"]
        .get('/auth/check')
        .then(function (_a) {
        var data = _a.data;
        if (!data.confirmed) {
            dispatch((0, userSlice_1.setUser)(__assign(__assign({}, data), { status: 'non-active' })));
        }
        if (data.confirmed) {
            dispatch((0, userSlice_1.setUser)(__assign(__assign({}, data), { status: 'active' })));
        }
    })["catch"](function () { return dispatch((0, userSlice_1.logoutUser)('guest')); });
}; };
exports.checkUserThunk = checkUserThunk;
var logoutThunk = function () { return function (dispatch) {
    axios_1["default"]
        .get('/auth/logout')
        .then(function () { return dispatch((0, userSlice_1.logoutUser)('guest')); })["catch"](function (err) { return console.log(err); });
}; };
exports.logoutThunk = logoutThunk;
