"use strict";
exports.__esModule = true;
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var questionsSlice_1 = require("./redux/slices/questions/questionsSlice");
var themeSlice_1 = require("./redux/slices/themes/themeSlice");
var userSlice_1 = require("./redux/slices/user/userSlice");
var requestSlice_1 = require("./redux/slices/request/requestSlice");
var documentSlice_1 = require("./redux/slices/documents/documentSlice");
var erorsSlice_1 = require("./redux/slices/erors/erorsSlice");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        question: questionsSlice_1["default"],
        theme: themeSlice_1["default"],
        user: userSlice_1["default"],
        request: requestSlice_1["default"],
        document: documentSlice_1["default"],
        eror: erorsSlice_1["default"]
    }
});
