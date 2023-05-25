"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var hooks_1 = require("../../features/hooks");
var requestThunk_1 = require("../../features/redux/slices/request/requestThunk");
function UserModalWindow(_a) {
    var showModal = _a.showModal, setShowModal = _a.setShowModal;
    var _b = react_1["default"].useState(''), input = _b[0], setInut = _b[1];
    var dispatch = (0, hooks_1.useAppDispatch)();
    var user = (0, hooks_1.useAppSelector)(function (state) { return state.user; });
    var handlerHide = function () {
        setShowModal(function (prev) { return !prev; });
    };
    var submitHandler = function (e) {
        e.preventDefault();
        setShowModal(false);
        setInut('');
        if (user.status === 'active')
            dispatch((0, requestThunk_1.addRequest)({ userId: user.id, title: input }));
    };
    return (<react_bootstrap_1.Modal show={showModal} onHide={handlerHide} size="lg" className="modal">
      <react_bootstrap_1.Modal.Header closeButton>
        <react_bootstrap_1.Modal.Title>Отправить предложение</react_bootstrap_1.Modal.Title>
      </react_bootstrap_1.Modal.Header>
      <react_bootstrap_1.Modal.Body>
        <react_bootstrap_1.Form onSubmit={submitHandler}>
          <react_bootstrap_1.Form.Control type="text" name="title" value={input} onChange={function (e) { return setInut(e.target.value); }}/>
          <react_bootstrap_1.Button variant="primary" type="submit">
            Отправить
          </react_bootstrap_1.Button>
        </react_bootstrap_1.Form>
      </react_bootstrap_1.Modal.Body>
    </react_bootstrap_1.Modal>);
}
exports["default"] = UserModalWindow;
