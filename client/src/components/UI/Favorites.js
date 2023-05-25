"use strict";
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var hooks_1 = require("../../features/hooks");
var favoritesThunk_1 = require("../../features/redux/slices/questions/favoritesThunk");
var MediaCard_1 = require("./MediaCard");
function Favorites() {
    var user = (0, hooks_1.useAppSelector)(function (state) { return state.user; });
    var dispatch = (0, hooks_1.useAppDispatch)();
    var favorites = (0, hooks_1.useAppSelector)(function (state) { return state.question.favorites; });
    {
        user.status === 'active' &&
            (0, react_1.useEffect)(function () {
                dispatch((0, favoritesThunk_1.getFavorites)(user.id));
            }, []);
    }
    return (<div>
      <material_1.Typography>Ваши избранные вопросы</material_1.Typography>
      {favorites.map(function (favorite) {
            var _a, _b, _c;
            return (<MediaCard_1["default"] key={favorite === null || favorite === void 0 ? void 0 : favorite.id} title={(_a = favorite === null || favorite === void 0 ? void 0 : favorite.Question) === null || _a === void 0 ? void 0 : _a.title} views={Number((_b = favorite === null || favorite === void 0 ? void 0 : favorite.Question) === null || _b === void 0 ? void 0 : _b.views)} id={(_c = favorite === null || favorite === void 0 ? void 0 : favorite.Question) === null || _c === void 0 ? void 0 : _c.id}/>);
        })}
    </div>);
}
exports["default"] = Favorites;
