"use strict";
exports.__esModule = true;
var React = require("react");
var Card_1 = require("@mui/material/Card");
var CardActions_1 = require("@mui/material/CardActions");
var CardContent_1 = require("@mui/material/CardContent");
var Button_1 = require("@mui/material/Button");
var Typography_1 = require("@mui/material/Typography");
var react_router_dom_1 = require("react-router-dom");
var Visibility_1 = require("@mui/icons-material/Visibility");
var FunctionalButton_1 = require("./FunctionalButton");
function MediaCard(_a) {
    var title = _a.title, id = _a.id, views = _a.views, feedback = _a.feedback;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var location = (0, react_router_dom_1.useLocation)();
    console.log(location.pathname);
    return (<Card_1["default"] sx={{ maxWidth: 345 }}>
      <CardContent_1["default"]>
        <Typography_1["default"] gutterBottom variant="h5" component="div">
          {title}
        </Typography_1["default"]>
        {views && (<div>
            <Visibility_1["default"] />
            <Typography_1["default"] gutterBottom variant="h6" component="div">
              {views}
            </Typography_1["default"]>
          </div>)}
        {feedback && (<Typography_1["default"] gutterBottom variant="h6" component="div">
            {feedback}
          </Typography_1["default"]>)}
      </CardContent_1["default"]>
      <CardActions_1["default"]>
        {location.pathname !== '/cabinet/requests' && (<Button_1["default"] size="small" onClick={function (e) {
                return views ? navigate("/answer/".concat(Number(id))) : navigate("/theme/".concat(Number(id)));
            }}>
            Узнать больше
          </Button_1["default"]>)}
        <FunctionalButton_1["default"] id={id} pathname={location.pathname}/>
      </CardActions_1["default"]>
    </Card_1["default"]>);
}
exports["default"] = MediaCard;
