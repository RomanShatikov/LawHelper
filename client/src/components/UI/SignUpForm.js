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
var react_1 = require("react");
var Button_1 = require("@mui/material/Button");
var material_1 = require("@mui/material");
var Visibility_1 = require("@mui/icons-material/Visibility");
var LockOutlined_1 = require("@mui/icons-material/LockOutlined");
var react_router_dom_1 = require("react-router-dom");
var hooks_1 = require("../../features/hooks");
var thunkActions_1 = require("../../features/redux/slices/user/thunkActions");
function SignUpForm() {
    var erors = (0, hooks_1.useAppSelector)(function (state) { return state.eror; });
    console.log(erors);
    var _a = (0, react_1.useState)({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: ''
    }), input = _a[0], setInput = _a[1];
    var _b = (0, react_1.useState)({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: ''
    }), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(false), isVisible = _c[0], setVisible = _c[1];
    var _d = (0, react_1.useState)(false), isRepeatVisible = _d[0], setRepeatVisible = _d[1];
    var inputHandler = function (e) {
        setInput(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[e.target.name] = e.target.value, _a)));
        });
        if (e.target.value)
            setError(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[e.target.name] = '', _a)));
            });
    };
    function validatePassword(password, repeatPassword) {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (password === '') {
            setError(function (prev) { return (__assign(__assign({}, prev), { password: 'Введите пароль' })); });
            return false;
        }
        if (!regex.test(password)) {
            setError(function (prev) { return (__assign(__assign({}, prev), { password: 'Введите пароль длинной минимум восемь символов, содержащий минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ:' })); });
            return false;
        }
        if (password !== repeatPassword) {
            setError(function (prev) { return (__assign(__assign({}, prev), { password: 'Пароли не совпадают, попробуйте еще раз' })); });
            return false;
        }
        return true;
    }
    var dispatch = (0, hooks_1.useAppDispatch)();
    var handleSubmit = function (e) {
        e.preventDefault();
        if (!input.firstName) {
            setError(function (prev) { return (__assign(__assign({}, prev), { firstName: 'Введите имя' })); });
        }
        if (!input.lastName) {
            setError(function (prev) { return (__assign(__assign({}, prev), { lastName: 'Введите фамилию' })); });
        }
        if (!input.email) {
            setError(function (prev) { return (__assign(__assign({}, prev), { email: 'Введите email' })); });
        }
        if (!input.repeatPassword) {
            setError(function (prev) { return (__assign(__assign({}, prev), { repeatPassword: 'Введите пароль повторно' })); });
        }
        if (validatePassword(input.password, input.repeatPassword) &&
            input.email &&
            input.firstName &&
            input.lastName) {
            var data = Object.fromEntries(new FormData(e.currentTarget));
            dispatch((0, thunkActions_1.signUpThunk)(data));
            alert('Проверьте почту');
        }
    };
    return (<material_1.Container component="main" maxWidth="xs">
      <material_1.CssBaseline />
      <material_1.Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
        <material_1.Avatar sx={{ m: 1, bgcolor: 'black' }}>
          <LockOutlined_1["default"] />
        </material_1.Avatar>
        <material_1.Typography component="h1" variant="h5">
          Sign up
        </material_1.Typography>
        <material_1.Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <material_1.Grid container spacing={2}>
            <material_1.Grid item xs={12} sm={6}>
              <material_1.TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="Имя" value={input.firstName || ''} onChange={inputHandler} autoFocus/>
              {error.firstName && <p>{error.firstName}</p>}
            </material_1.Grid>
            <material_1.Grid item xs={12} sm={6}>
              <material_1.TextField required fullWidth id="lastName" label="Фамилия" name="lastName" value={input.lastName || ''} onChange={inputHandler} autoComplete="family-name"/>
              {error.lastName && <p>{error.lastName}</p>}
            </material_1.Grid>
            <material_1.Grid item xs={12}>
              <material_1.TextField required fullWidth id="email" label="Email" name="email" value={input.email || ''} onChange={inputHandler} autoComplete="email"/>
              {error.email && <p>{error.email}</p>}
              {erors.EmailEror && <p>{erors.EmailEror}</p>}
            </material_1.Grid>
            <material_1.Grid item xs={12}>
              <material_1.TextField required fullWidth name="password" label="Введите пароль" type={isVisible ? 'text' : 'password'} id="password" value={input.password || ''} onChange={inputHandler} autoComplete="new-password"/>
              <button type="button" onClick={function () { return setVisible(!isVisible); }}>
                <Visibility_1["default"] />
              </button>
              {error.password && <p>{error.password}</p>}
            </material_1.Grid>
            <material_1.Grid item xs={12}>
              <material_1.TextField required fullWidth name="repeatPassword" label="Повторите пароль" type={isRepeatVisible ? 'text' : 'password'} id="repeatPassword" value={input.repeatPassword || ''} onChange={inputHandler} autoComplete="new-password"/>
              <button type="button" onClick={function () { return setRepeatVisible(!isRepeatVisible); }}>
                <Visibility_1["default"] />
              </button>
              {error.repeatPassword && <p>{error.repeatPassword}</p>}
            </material_1.Grid>
          </material_1.Grid>

          <Button_1["default"] type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Зарегистрироваться
          </Button_1["default"]>
          <material_1.Grid container justifyContent="flex-end">
            <material_1.Grid item>
              <material_1.Link component={react_router_dom_1.Link} to="/login" variant="body2">
                Уже есть аккаунт? Войдите
              </material_1.Link>
            </material_1.Grid>
          </material_1.Grid>
        </material_1.Box>
      </material_1.Box>
    </material_1.Container>);
}
exports["default"] = SignUpForm;
