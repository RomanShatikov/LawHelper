import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/hooks';

export default function YandexMap(): JSX.Element {
  const question = useAppSelector((state) => state.question.currentQuestion);
  console.log(question);
  useEffect(() => {
    if (question && question.mark1 && question.mark2) {
      function init(): void {
        const myMap:any = new window.ymaps.Map('map', {
          center: [Number(question?.mark1), Number(question?.mark2)],
          zoom: 15,
          controls: [],
        });
        const sort = new window.ymaps.Placemark(
          [Number(question?.mark1), Number(question?.mark2)],
          {
            balloonContentHeader: 'Межрайонная ИФНС России № 46 по г. Москве',
            balloonContentBody:
              '<img src="https://avatars.mds.yandex.net/get-altay/3986135/2a000001784091b370f8b422b22d7bf98060/XXXL" alt="sort" width="200" heigth="200">',
            balloonContentFooter: 'Вкусный',
          },
        );
        myMap.geoObjects.add(sort);
      }

      void window.ymaps.ready(init);
    }
  }, []);
  return <div id="map" style={{ width: '300px', height: '300px' }} />;
}
