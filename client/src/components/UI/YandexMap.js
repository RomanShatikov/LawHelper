"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-inner-declarations */
exports.__esModule = true;
var react_1 = require("react");
var hooks_1 = require("../../features/hooks");
function YandexMap() {
    var question = (0, hooks_1.useAppSelector)(function (state) { return state.question.currentQuestion; });
    console.log(question);
    (0, react_1.useEffect)(function () {
        if (question && question.mark1 && question.mark2) {
            function init() {
                var myMap = new window.Map.Map('map', {
                    center: [Number(question === null || question === void 0 ? void 0 : question.mark1), Number(question === null || question === void 0 ? void 0 : question.mark2)],
                    zoom: 15,
                    controls: []
                });
                var sort = new window.Map.Placemark([Number(question === null || question === void 0 ? void 0 : question.mark1), Number(question === null || question === void 0 ? void 0 : question.mark2)], {
                    balloonContentHeader: 'Межрайонная ИФНС России № 46 по г. Москве',
                    balloonContentBody: '<img src="https://avatars.mds.yandex.net/get-altay/3986135/2a000001784091b370f8b422b22d7bf98060/XXXL" alt="sort" width="200" heigth="200">',
                    balloonContentFooter: 'Вкусный'
                });
                myMap.geoObjects.add(sort);
            }
            void window.Map.ready(init);
        }
    }, []);
    return <div id="map" style={{ width: '300px', height: '300px' }}/>;
}
exports["default"] = YandexMap;
