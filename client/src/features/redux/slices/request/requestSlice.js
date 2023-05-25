"use strict";
var _a;
exports.__esModule = true;
exports.appendRequest = exports.deleteRequest = exports.setRequest = exports.requestSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    requests: []
};
exports.requestSlice = (0, toolkit_1.createSlice)({
    name: 'request',
    initialState: initialState,
    reducers: {
        setRequest: function (state, action) {
            state.requests = action.payload;
        },
        deleteRequest: function (state, action) {
            var foundIndex = state.requests.findIndex(function (el) { return el.id === action.payload; });
            if (foundIndex !== -1)
                state.requests.splice(foundIndex, 1);
        },
        appendRequest: function (state, action) {
            state.requests.push(action.payload);
        }
    }
});
exports.setRequest = (_a = exports.requestSlice.actions, _a.setRequest), exports.deleteRequest = _a.deleteRequest, exports.appendRequest = _a.appendRequest;
exports["default"] = exports.requestSlice.reducer;
