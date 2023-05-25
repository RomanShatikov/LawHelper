"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-lone-blocks */
var react_1 = require("react");
var reactstrap_1 = require("reactstrap");
var Grade_1 = require("@mui/icons-material/Grade");
var Clear_1 = require("@mui/icons-material/Clear");
var hooks_1 = require("../../features/hooks");
var favoritesThunk_1 = require("../../features/redux/slices/questions/favoritesThunk");
function FunctionalButton(_a) {
    var pathname = _a.pathname, id = _a.id;
    var user = (0, hooks_1.useAppSelector)(function (state) { return state.user; });
    var favorites = (0, hooks_1.useAppSelector)(function (state) { return state.question.favorites; });
    var dispatch = (0, hooks_1.useAppDispatch)();
    (0, react_1.useEffect)(function () {
        if (user.status === 'active')
            dispatch((0, favoritesThunk_1.getFavorites)(Number(user.id)));
    }, []);
    var addFavoriteHandler = function () {
        if (user.status === 'active')
            dispatch((0, favoritesThunk_1.appendFavorite)({ userId: user.id, questionId: id }));
    };
    var deleteFavoriteHandler = function () {
        if (user.status === 'active')
            dispatch((0, favoritesThunk_1.deleteFavorite)({ userId: user.id, questionId: id }));
    };
    if (user.status !== 'active')
        return <p> </p>;
    if (favorites.find(function (favorite) { return favorite.questionId === id; })) {
        return (<reactstrap_1.Button size="small" onClick={deleteFavoriteHandler}>
        <Clear_1["default"] />
      </reactstrap_1.Button>);
    }
    if (pathname === '/cabinet/requests')
        return <p> </p>;
    return (<reactstrap_1.Button size="small" onClick={addFavoriteHandler}>
      <Grade_1["default"] />
    </reactstrap_1.Button>);
}
exports["default"] = FunctionalButton;
