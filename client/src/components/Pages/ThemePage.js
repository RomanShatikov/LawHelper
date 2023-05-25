"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
var Pagination_1 = require("@mui/material/Pagination");
var SearchInputTheme_1 = require("../UI/SearchInputTheme");
var SearchInputQuest_1 = require("../UI/SearchInputQuest");
var hooks_1 = require("../../features/hooks");
var themeThunk_1 = require("../../features/redux/slices/themes/themeThunk");
var MediaCard_1 = require("../UI/MediaCard");
function ThemePage() {
    var themes = (0, hooks_1.useAppSelector)(function (state) { return state.theme.themes; });
    var _a = react_1["default"].useState(0), pageCount = _a[0], setPageCount = _a[1];
    var dispatch = (0, hooks_1.useAppDispatch)();
    var title = (0, react_router_dom_1.useParams)().title;
    (0, react_1.useEffect)(function () {
        axios_1["default"]
            .post('/themesPageCount', { title: title })
            .then(function (res) { return setPageCount(res.data.pageCount); })["catch"](function (err) { return console.log(err); });
    }, []);
    (0, react_1.useEffect)(function () {
        axios_1["default"]
            .post('/themesPageCount', { title: title })
            .then(function (res) { return setPageCount(res.data.pageCount); })["catch"](function (err) { return console.log(err); });
    }, [title]);
    (0, react_1.useEffect)(function () {
        dispatch((0, themeThunk_1.getFirstThemes)(title));
    }, []);
    (0, react_1.useEffect)(function () {
        dispatch((0, themeThunk_1.getFirstThemes)(title));
    }, [title]);
    var paginationHandler = function (e) {
        if (!(e.target instanceof HTMLElement))
            return;
        var page = Number(e.target.textContent);
        dispatch((0, themeThunk_1.getThemesByPage)({ title: title, page: page }));
    };
    return (<>
      <SearchInputQuest_1["default"] />
      <SearchInputTheme_1["default"] />
      {pageCount ? <Pagination_1["default"] count={pageCount} onClick={function (e) { return paginationHandler(e); }}/> : null}
      {themes.length ? (themes === null || themes === void 0 ? void 0 : themes.map(function (theme) { return <MediaCard_1["default"] key={theme === null || theme === void 0 ? void 0 : theme.id} title={theme === null || theme === void 0 ? void 0 : theme.title} id={theme === null || theme === void 0 ? void 0 : theme.id}/>; })) : (<p>Тут ничего нет, попробуйте поискать другую тему</p>)}
    </>);
}
exports["default"] = ThemePage;
