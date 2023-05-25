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
var react_bootstrap_1 = require("react-bootstrap");
var hooks_1 = require("../../features/hooks");
var themeThunk_1 = require("../../features/redux/slices/themes/themeThunk");
var requestThunk_1 = require("../../features/redux/slices/request/requestThunk");
var questionsThunk_1 = require("../../features/redux/slices/questions/questionsThunk");
function ModalPage(_a) {
    var showModal = _a.showModal, onHide = _a.onHide, selectedItem = _a.selectedItem;
    var dispatch = (0, hooks_1.useAppDispatch)();
    var _b = (0, react_1.useState)(false), showForm = _b[0], setShowForm = _b[1];
    var _c = (0, react_1.useState)({
        theme: 0,
        question: '',
        title: '',
        answer: '',
        urlDoc: '',
        mark1: '',
        mark2: '',
        themeId: 0,
        id: 0,
        views: ''
    }), inputs = _c[0], setInputs = _c[1];
    var _d = (0, react_1.useState)(''), title = _d[0], setTitle = _d[1];
    var themes = (0, hooks_1.useAppSelector)(function (state) { return state.theme.themes; });
    var handleChangeState = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setInputs(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleThemeChange = function (selectedTheme) {
        setTitle(selectedTheme.title);
        setInputs(function (prevState) { return (__assign(__assign({}, prevState), { theme: selectedTheme.id })); });
    };
    var handleDeleteRequest = function () {
        if (selectedItem && selectedItem.id) {
            dispatch((0, requestThunk_1.deleteRequestThunk)(selectedItem.id));
            setTitle('');
        }
    };
    var submitHandler = function (e) {
        e.preventDefault();
        dispatch((0, questionsThunk_1.submitQuestion)(inputs));
        setShowForm(false);
        setInputs({
            theme: 0,
            title: '',
            question: '',
            answer: '',
            urlDoc: '',
            mark1: '',
            mark2: '',
            themeId: 0,
            id: 0,
            views: ''
        });
    };
    (0, react_1.useEffect)(function () {
        dispatch((0, themeThunk_1.getAllThemes)());
    }, []);
    return (<react_bootstrap_1.Modal show={showModal} onHide={onHide} size="lg" className="modal">
      <react_bootstrap_1.Modal.Header closeButton>
        <react_bootstrap_1.Modal.Title>Добавить новый запрос</react_bootstrap_1.Modal.Title>
      </react_bootstrap_1.Modal.Header>
      <react_bootstrap_1.Modal.Body>
        <p className="title">{selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.title}</p>
        <p className="feedback">{selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.feedback}</p>
        <div className="buttons">
          <react_bootstrap_1.Button variant="secondary" onClick={function () {
            handleDeleteRequest();
            onHide();
        }}>
            Удалить
          </react_bootstrap_1.Button>
          {!showForm ? (<react_bootstrap_1.Button variant="primary" onClick={function () { return setShowForm(true); }}>
              Заполнить
            </react_bootstrap_1.Button>) : (<react_bootstrap_1.Button variant="primary" onClick={function () { return setShowForm(false); }}>
              Скрыть
            </react_bootstrap_1.Button>)}
        </div>
        {showForm && (<react_bootstrap_1.Form>
            <react_bootstrap_1.Dropdown>
              <react_bootstrap_1.Dropdown.Toggle variant="success" id="dropdown-basic">
                {title || 'Выберите тему'}
              </react_bootstrap_1.Dropdown.Toggle>
              <react_bootstrap_1.Dropdown.Menu>
                {themes === null || themes === void 0 ? void 0 : themes.map(function (theme) { return (<react_bootstrap_1.Dropdown.Item key={theme === null || theme === void 0 ? void 0 : theme.id} onClick={function () { return handleThemeChange(theme); }}>
                    {theme === null || theme === void 0 ? void 0 : theme.title}
                  </react_bootstrap_1.Dropdown.Item>); })}
              </react_bootstrap_1.Dropdown.Menu>
            </react_bootstrap_1.Dropdown>
            <react_bootstrap_1.Form.Group controlId="input2">
              <react_bootstrap_1.Form.Label>Вопрос</react_bootstrap_1.Form.Label>
              <react_bootstrap_1.Form.Control type="text" name="title" value={inputs === null || inputs === void 0 ? void 0 : inputs.title} onChange={handleChangeState}/>
            </react_bootstrap_1.Form.Group>
            <react_bootstrap_1.Form.Group controlId="input2">
              <react_bootstrap_1.Form.Label>Ответ</react_bootstrap_1.Form.Label>
              <react_bootstrap_1.Form.Control type="text" name="answer" value={inputs === null || inputs === void 0 ? void 0 : inputs.answer} onChange={handleChangeState}/>
            </react_bootstrap_1.Form.Group>
            <react_bootstrap_1.Form.Group controlId="input2">
              <react_bootstrap_1.Form.Label>Ссылка на источник (url)</react_bootstrap_1.Form.Label>
              <react_bootstrap_1.Form.Control type="text" name="urlDoc" value={inputs === null || inputs === void 0 ? void 0 : inputs.urlDoc} onChange={handleChangeState}/>
            </react_bootstrap_1.Form.Group>
          </react_bootstrap_1.Form>)}
      </react_bootstrap_1.Modal.Body>
      {showForm && (<react_bootstrap_1.Modal.Footer>
          <react_bootstrap_1.Button variant="secondary" onClick={onHide}>
            Закрыть
          </react_bootstrap_1.Button>
          <react_bootstrap_1.Button variant="primary" onClick={function (e) { return submitHandler; }}>
            Добавить
          </react_bootstrap_1.Button>
        </react_bootstrap_1.Modal.Footer>)}
    </react_bootstrap_1.Modal>);
}
exports["default"] = ModalPage;
