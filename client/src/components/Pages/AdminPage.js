"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var ModalPage_1 = require("./ModalPage");
var hooks_1 = require("../../features/hooks");
var requestThunk_1 = require("../../features/redux/slices/request/requestThunk");
function TransactionList() {
    var requests = (0, hooks_1.useAppSelector)(function (store) { return store.request.requests; });
    var _a = (0, react_1.useState)(false), showModal = _a[0], setShowModal = _a[1];
    var _b = (0, react_1.useState)(null), selectedItem = _b[0], setSelectedItem = _b[1];
    var dispatch = (0, hooks_1.useAppDispatch)();
    (0, react_1.useEffect)(function () {
        dispatch((0, requestThunk_1.loadRequests)());
    }, []);
    var handleCardClick = function (request) {
        setSelectedItem(request);
        setShowModal(true);
    };
    return (<react_bootstrap_1.Container>
      <react_bootstrap_1.Row>
        <react_bootstrap_1.Col>
          <react_bootstrap_1.ListGroup>
            {requests.map(function (request) { return (<react_bootstrap_1.ListGroup.Item key={request.id} action variant="secondary" onClick={function () { return handleCardClick(request); }}>
                {request.title}
              </react_bootstrap_1.ListGroup.Item>); })}
          </react_bootstrap_1.ListGroup>
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Row>
      {showModal && (<ModalPage_1["default"] showModal={showModal} onHide={function () { return setShowModal(false); }} selectedItem={selectedItem}/>)}
    </react_bootstrap_1.Container>);
}
exports["default"] = TransactionList;
