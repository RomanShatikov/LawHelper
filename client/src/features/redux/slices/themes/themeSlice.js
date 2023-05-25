"use strict";
var _a;
exports.__esModule = true;
exports.deleteTheme = exports.setThemes = exports.themeSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    themes: []
};
exports.themeSlice = (0, toolkit_1.createSlice)({
    name: 'themes',
    initialState: initialState,
    reducers: {
        setThemes: function (state, action) {
            state.themes = action.payload;
        },
        deleteTheme: function (state, action) {
            var foundIndex = state.themes.findIndex(function (el) { return el.id === action.payload; });
            if (foundIndex !== -1)
                state.themes.splice(foundIndex, 1);
        }
    }
});
exports.setThemes = (_a = exports.themeSlice.actions, _a.setThemes), exports.deleteTheme = _a.deleteTheme;
exports["default"] = exports.themeSlice.reducer;
