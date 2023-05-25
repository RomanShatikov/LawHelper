"use strict";
exports.__esModule = true;
exports.getDocumentById = void 0;
var axios_1 = require("axios");
var documentSlice_1 = require("./documentSlice");
var getDocumentById = function (id) { return function (dispatch) {
    (0, axios_1["default"])("/documents/".concat(id))
        .then(function (_a) {
        var data = _a.data;
        return dispatch((0, documentSlice_1.setDocuments)(data));
    })["catch"](function (err) { return console.error(err); });
}; };
exports.getDocumentById = getDocumentById;
exports["default"] = exports.getDocumentById;
