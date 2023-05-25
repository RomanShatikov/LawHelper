"use strict";
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var requestThunk_1 = require("../../features/redux/slices/request/requestThunk");
var MediaCard_1 = require("./MediaCard");
var hooks_1 = require("../../features/hooks");
function Requests() {
    var user = (0, hooks_1.useAppSelector)(function (state) { return state.user; });
    var dispatch = (0, hooks_1.useAppDispatch)();
    var requests = (0, hooks_1.useAppSelector)(function (state) { return state.request.requests; });
    (0, react_1.useEffect)(function () {
        if (user.status === 'active')
            dispatch((0, requestThunk_1.getRequests)(user.id));
    }, []);
    return (<div>
      <material_1.Typography>Ваши предложения</material_1.Typography>
      {requests.map(function (request) { return (<MediaCard_1["default"] key={request === null || request === void 0 ? void 0 : request.id} title={request === null || request === void 0 ? void 0 : request.title} feedback={request === null || request === void 0 ? void 0 : request.feedback}/>); })}
    </div>);
}
exports["default"] = Requests;
