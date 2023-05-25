"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Pagination_1 = require("@mui/material/Pagination");
var axios_1 = require("axios");
var react_router_dom_1 = require("react-router-dom");
var hooks_1 = require("../../features/hooks");
var SearchInputQuest_1 = require("../UI/SearchInputQuest");
var questionsThunk_1 = require("../../features/redux/slices/questions/questionsThunk");
var MediaCard_1 = require("../UI/MediaCard");
function QuestionsPage() {
    var questions = (0, hooks_1.useAppSelector)(function (state) { return state.question.questions; });
    var _a = react_1["default"].useState(0), pageCount = _a[0], setPageCount = _a[1];
    var _b = react_1["default"].useState(1), currentPage = _b[0], setCurrentPage = _b[1];
    var dispatch = (0, hooks_1.useAppDispatch)();
    var _c = (0, react_router_dom_1.useParams)(), id = _c.id, title = _c.title;
    (0, react_1.useEffect)(function () {
        axios_1["default"]
            .post('/questionsPageCount', { id: id, title: title })
            .then(function (res) { var _a; return setPageCount(Number((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.pageCount)); })["catch"](function (err) { return console.log(err); });
    }, []);
    (0, react_1.useEffect)(function () {
        axios_1["default"]
            .post('/questionsPageCount', { id: id, title: title })
            .then(function (res) { var _a; return setPageCount(Number((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.pageCount)); })["catch"](function (err) { return console.log(err); });
    }, [title]);
    (0, react_1.useEffect)(function () {
        dispatch((0, questionsThunk_1.getFirstQuestions)({ id: Number(id), title: title }));
    }, []);
    (0, react_1.useEffect)(function () {
        dispatch((0, questionsThunk_1.getFirstQuestions)({ id: Number(id), title: title }));
    }, [title]);
    var paginationHandler = function (e, page) {
        setCurrentPage(page);
        dispatch((0, questionsThunk_1.getQuestionsByPage)({ id: Number(id), page: page, title: title }));
    };
    return (<>
      <SearchInputQuest_1["default"] />
      {pageCount ? (<Pagination_1["default"] count={pageCount} page={currentPage} onChange={paginationHandler}/>) : null}
      {questions.length ? (questions === null || questions === void 0 ? void 0 : questions.map(function (question) { return (<MediaCard_1["default"] key={question === null || question === void 0 ? void 0 : question.id} title={question === null || question === void 0 ? void 0 : question.title} id={question === null || question === void 0 ? void 0 : question.id} views={Number(question === null || question === void 0 ? void 0 : question.views)}/>); })) : (<p>Тут ничего нет, попробуйте поискать другую тему</p>)}
    </>);
}
exports["default"] = QuestionsPage;
