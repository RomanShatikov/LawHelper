"use strict";
var _a;
exports.__esModule = true;
exports.delFavorite = exports.addFavorite = exports.setFavorites = exports.setCurrentQuestion = exports.addQuestion = exports.setQuestions = exports.questionsSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    questions: [],
    favorites: [],
    currentQuestion: null
};
exports.questionsSlice = (0, toolkit_1.createSlice)({
    name: 'questions',
    initialState: initialState,
    reducers: {
        setQuestions: function (state, action) {
            state.questions = action.payload;
        },
        setFavorites: function (state, action) {
            state.favorites = action.payload;
        },
        addQuestion: function (state, action) {
            state.questions.unshift(action.payload);
        },
        addFavorite: function (state, action) {
            state.favorites.push(action.payload);
        },
        delFavorite: function (state, action) {
            var foundFavoriteIndex = state.favorites.findIndex(function (favorite) {
                return favorite.questionId === action.payload.questionId &&
                    favorite.userId === action.payload.userId;
            });
            if (foundFavoriteIndex !== -1) {
                state.favorites.splice(foundFavoriteIndex, 1);
            }
        },
        setCurrentQuestion: function (state, action) {
            state.currentQuestion = action.payload;
        }
    }
});
exports.setQuestions = (_a = exports.questionsSlice.actions, _a.setQuestions), exports.addQuestion = _a.addQuestion, exports.setCurrentQuestion = _a.setCurrentQuestion, exports.setFavorites = _a.setFavorites, exports.addFavorite = _a.addFavorite, exports.delFavorite = _a.delFavorite;
exports["default"] = exports.questionsSlice.reducer;
