"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Card_1 = require("@mui/material/Card");
var CardContent_1 = require("@mui/material/CardContent");
var CardMedia_1 = require("@mui/material/CardMedia");
var Typography_1 = require("@mui/material/Typography");
var react_router_dom_1 = require("react-router-dom");
var Article_1 = require("@mui/icons-material/Article");
var hooks_1 = require("../../features/hooks");
function DocCard(_a) {
    var url = _a.url, id = _a.id;
    var localhost = 'http://localhost:5173/';
    var documents = (0, hooks_1.useAppSelector)(function (state) { return state.document.documents; });
    var dispatch = (0, hooks_1.useAppDispatch)();
    var location = (0, react_router_dom_1.useLocation)();
    console.log(location);
    console.log('---ddd----', id);
    return (<>
      <Typography_1["default"] gutterBottom variant="h5" component="div">
        Документы по вопросу
      </Typography_1["default"]>
      {documents.map(function (document) { return (<Card_1["default"] sx={{ maxWidth: 400 }} key={document.id}>
          <CardMedia_1["default"] sx={{ height: 100 }}/>
          <CardContent_1["default"]>
            <div>
              <a href={document.urlDoc} download>
                <Article_1["default"] />
              </a>
              <a href={document.urlDoc} download>
                <Typography_1["default"] gutterBottom variant="h5" component="div">
                  {document.title}
                </Typography_1["default"]>
              </a>
            </div>
          </CardContent_1["default"]>
        </Card_1["default"]>); })}
    </>);
}
exports["default"] = DocCard;
