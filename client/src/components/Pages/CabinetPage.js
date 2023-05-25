"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var reactstrap_1 = require("reactstrap");
var hooks_1 = require("../../features/hooks");
var Requests_1 = require("../UI/Requests");
var Favorites_1 = require("../UI/Favorites");
var UserModalWindow_1 = require("../UI/UserModalWindow");
function CabinetPage() {
    var user = (0, hooks_1.useAppSelector)(function (state) { return state.user; });
    console.log(user);
    var _a = (0, react_1.useState)(false), showModal = _a[0], setShowModal = _a[1];
    var location = (0, react_router_dom_1.useLocation)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    if (user.status !== 'active')
        return <p />;
    return (<div>
      <material_1.Avatar sx={{ bgcolor: '#1ebc6d' }}>
        {user === null || user === void 0 ? void 0 : user.firstName[0]}
        {user === null || user === void 0 ? void 0 : user.lastName[0]}
      </material_1.Avatar>
      <material_1.Typography>
        {user === null || user === void 0 ? void 0 : user.firstName} {user === null || user === void 0 ? void 0 : user.lastName}
      </material_1.Typography>
      <reactstrap_1.Button variant="contained" type="button" onClick={function (e) { return setShowModal(function (prev) { return !prev; }); }}>
        Обратная связь
      </reactstrap_1.Button>
      {showModal && <UserModalWindow_1["default"] showModal={showModal} setShowModal={setShowModal}/>}
      <reactstrap_1.Button variant="contained" type="button" onClick={function (e) { return navigate('/cabinet/favorites'); }}>
        Избранное
      </reactstrap_1.Button>
      <reactstrap_1.Button variant="contained" type="button" onClick={function (e) { return navigate('/cabinet/requests'); }}>
        Предложения
      </reactstrap_1.Button>
      {location.pathname === '/cabinet/requests' ? <Requests_1["default"] /> : <Favorites_1["default"] />}
    </div>);
}
exports["default"] = CabinetPage;
