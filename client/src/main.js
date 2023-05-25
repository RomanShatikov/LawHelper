"use strict";
exports.__esModule = true;
var react_1 = require("react");
var client_1 = require("react-dom/client");
require("bootstrap/dist/css/bootstrap.min.css");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
var react_redux_1 = require("react-redux");
var App_1 = require("./App");
var store_1 = require("./features/store");
axios_1["default"].defaults.baseURL = 'http://localhost:3001/api';
axios_1["default"].defaults.withCredentials = true;
client_1["default"].createRoot(document.getElementById('root')).render(<react_router_dom_1.BrowserRouter>
    <react_redux_1.Provider store={store_1.store}>
      <App_1["default"] />
    </react_redux_1.Provider>
  </react_router_dom_1.BrowserRouter>);
