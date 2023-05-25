"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var reactstrap_1 = require("reactstrap");
var AdminPage_1 = require("./components/Pages/AdminPage");
var LoginPage_1 = require("./components/Pages/LoginPage");
var MainPage_1 = require("./components/Pages/MainPage");
var SignUpPage_1 = require("./components/Pages/SignUpPage");
var NavBar_1 = require("./components/UI/NavBar");
var CabinetPage_1 = require("./components/Pages/CabinetPage");
var ThemePage_1 = require("./components/Pages/ThemePage");
var QuestionsPage_1 = require("./components/Pages/QuestionsPage");
var AnswerPage_1 = require("./components/Pages/AnswerPage");
var hooks_1 = require("./features/hooks");
var PrivateRouter_1 = require("./components/HOC/PrivateRouter");
var thunkActions_1 = require("./features/redux/slices/user/thunkActions");
var Loader_1 = require("./components/HOC/Loader");
function App() {
    var user = (0, hooks_1.useAppSelector)(function (store) { return store.user; });
    console.log(user);
    var dispatch = (0, hooks_1.useAppDispatch)();
    (0, react_1.useEffect)(function () {
        dispatch((0, thunkActions_1.checkUserThunk)());
    }, []);
    return (<reactstrap_1.Container style={{ minHeight: '100vh', margin: 0, minWidth: '100vw' }}>
      <Loader_1["default"]>
        <>
          <NavBar_1["default"] />
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<MainPage_1["default"] />}/>
            <react_router_dom_1.Route element={<PrivateRouter_1["default"] isAllowed={user.status === 'guest' || user.status === 'non-active'}/>}>
              <react_router_dom_1.Route path="/signup" element={<SignUpPage_1["default"] />}/>
              <react_router_dom_1.Route path="/login" element={<LoginPage_1["default"] />}/>
            </react_router_dom_1.Route>

            <react_router_dom_1.Route element={<PrivateRouter_1["default"] isAllowed={user.status === 'active'} redirectPath="/login"/>}>
              <react_router_dom_1.Route path="/cabinet/favorites" element={<CabinetPage_1["default"] />}/>
              <react_router_dom_1.Route path="/cabinet/requests" element={<CabinetPage_1["default"] />}/>
            </react_router_dom_1.Route>

            <react_router_dom_1.Route element={<PrivateRouter_1["default"] isAllowed={(user === null || user === void 0 ? void 0 : user.status) === 'active' && (user === null || user === void 0 ? void 0 : user.isAdmin) === true} redirectPath="/login"/>}>
              <react_router_dom_1.Route path="/admin" element={<AdminPage_1["default"] />}/>
            </react_router_dom_1.Route>

            <react_router_dom_1.Route path="/theme" element={<ThemePage_1["default"] />}/>
            <react_router_dom_1.Route path="/question" element={<QuestionsPage_1["default"] />}/>
            <react_router_dom_1.Route path="/themes/:title" element={<ThemePage_1["default"] />}/>
            <react_router_dom_1.Route path="/theme/:id" element={<QuestionsPage_1["default"] />}/>
            <react_router_dom_1.Route path="/question/:title" element={<QuestionsPage_1["default"] />}/>
            <react_router_dom_1.Route path="/answer/:id" element={<AnswerPage_1["default"] />}/>
          </react_router_dom_1.Routes>
        </>
      </Loader_1["default"]>
    </reactstrap_1.Container>);
}
exports["default"] = App;
