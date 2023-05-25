"use strict";
var _a;
exports.__esModule = true;
exports.setCurrentDocument = exports.setDocuments = exports.documentsSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    documents: [],
    currentDocument: null
};
exports.documentsSlice = (0, toolkit_1.createSlice)({
    name: 'documents',
    initialState: initialState,
    reducers: {
        setDocuments: function (state, action) {
            state.documents = action.payload;
        },
        setCurrentDocument: function (state, action) {
            state.currentDocument = action.payload;
        }
    }
});
exports.setDocuments = (_a = exports.documentsSlice.actions, _a.setDocuments), exports.setCurrentDocument = _a.setCurrentDocument;
exports["default"] = exports.documentsSlice.reducer;
