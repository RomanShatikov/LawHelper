"use strict";
exports.__esModule = true;
var React = require("react");
var Card_1 = require("@mui/material/Card");
var CardActions_1 = require("@mui/material/CardActions");
var CardContent_1 = require("@mui/material/CardContent");
var CardMedia_1 = require("@mui/material/CardMedia");
var Typography_1 = require("@mui/material/Typography");
var react_router_dom_1 = require("react-router-dom");
var reactstrap_1 = require("reactstrap");
var Visibility_1 = require("@mui/icons-material/Visibility");
var hooks_1 = require("../../features/hooks");
var documentThunk_1 = require("../../features/redux/slices/documents/documentThunk");
var questionsThunk_1 = require("../../features/redux/slices/questions/questionsThunk");
var Docs_1 = require("../UI/Docs");
var FunctionalButton_1 = require("../UI/FunctionalButton");
var YandexMap_1 = require("../UI/YandexMap");
function AnswerPage() {
    var question = (0, hooks_1.useAppSelector)(function (state) { return state.question.currentQuestion; });
    var document = (0, hooks_1.useAppSelector)(function (state) { return state.document.documents; });
    var dispatch = (0, hooks_1.useAppDispatch)();
    var location = (0, react_router_dom_1.useLocation)();
    var id = (0, react_router_dom_1.useParams)().id;
    React.useEffect(function () {
        dispatch((0, questionsThunk_1.getQuestionById)(Number(id)));
    }, []);
    React.useEffect(function () {
        dispatch((0, documentThunk_1.getDocumentById)(Number(id)));
    }, []);
    return (<reactstrap_1.Container>
      <Card_1["default"] sx={{ maxWidth: 400 }}>
        <CardMedia_1["default"] sx={{ height: 300 }}/>
        <CardContent_1["default"]>
          <Typography_1["default"] gutterBottom variant="h5" component="div">
            {question === null || question === void 0 ? void 0 : question.title}
          </Typography_1["default"]>
          <div>
            <Visibility_1["default"] />
            <Typography_1["default"] gutterBottom variant="h5" component="div">
              {question === null || question === void 0 ? void 0 : question.views}
            </Typography_1["default"]>
          </div>
          <Typography_1["default"] gutterBottom variant="h5" component="div">
            {question === null || question === void 0 ? void 0 : question.answer}
          </Typography_1["default"]>
          <Typography_1["default"] gutterBottom variant="h5" component="div">
            {question === null || question === void 0 ? void 0 : question.id}
          </Typography_1["default"]>
        </CardContent_1["default"]>
        <CardActions_1["default"]>
          <FunctionalButton_1["default"] id={Number(id)} pathname={location.pathname}/>
        </CardActions_1["default"]>
      </Card_1["default"]>
      <reactstrap_1.Col>{question && question.mark1 && question.mark2 && <YandexMap_1["default"] />}</reactstrap_1.Col>
      {(document === null || document === void 0 ? void 0 : document.length) !== 0 && <Docs_1["default"] id={Number(id)}/>}
    </reactstrap_1.Container>);
}
exports["default"] = AnswerPage;
