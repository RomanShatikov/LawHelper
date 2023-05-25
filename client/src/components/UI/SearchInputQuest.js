"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var axios_1 = require("axios");
var react_1 = require("react");
var Button_1 = require("@mui/material/Button");
var react_router_dom_1 = require("react-router-dom");
var hooks_1 = require("../../features/hooks");
function SearchInputQuest() {
    var questions = (0, hooks_1.useAppSelector)(function (state) { return state.question.questions; });
    var dispatch = (0, hooks_1.useAppDispatch)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = react_1["default"].useState([]), questsInInput = _a[0], setQuestsInInput = _a[1];
    var _b = react_1["default"].useState(''), input = _b[0], setInput = _b[1];
    react_1["default"].useEffect(function () {
        (0, axios_1["default"])('/preSearchQuestions')
            .then(function (res) { return setQuestsInInput(res.data); })["catch"](function (e) { return console.log(e); });
    }, []);
    react_1["default"].useEffect(function () {
        var timeoutId = setTimeout(function () {
            axios_1["default"]
                .post('/intualSearchQuestions', { title: input })
                .then(function (res) { return setQuestsInInput(res.data); })["catch"](function (e) { return console.log(e); });
        }, 500);
        return function () {
            clearTimeout(timeoutId);
        };
    }, [input]);
    var submitHandler = function (e) {
        e.preventDefault();
        navigate("/question/".concat(input));
    };
    return (<form onSubmit={function (e) { return submitHandler(e); }}>
      <material_1.Autocomplete id="free-solo-demo" selectOnFocus clearOnBlur freeSolo options={questsInInput.map(function (option) { return ({ label: option.title, id: option.id }); })} onInputChange={function (event, newInputValue) {
            setInput(newInputValue);
        }} renderInput={function (params) { return <material_1.TextField {...params} label="Вопрос" name="title"/>; }}/>
      <Button_1["default"] type="submit" variant="contained">
        Найти
      </Button_1["default"]>
    </form>);
}
exports["default"] = SearchInputQuest;
