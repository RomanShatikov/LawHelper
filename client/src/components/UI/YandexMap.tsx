/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-inner-declarations */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect } from 'react';
import { Card, Col } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../features/hooks';

export default function YandexMap(): JSX.Element {
  const question = useAppSelector((state) => state.question.currentQuestion);
  console.log(question);
  useEffect(() => {
    if (question && question.mark1 && question.mark2) {
      function init(): void {
        const myMap = new window.Map.Map('map', {
          center: [Number(question?.mark1), Number(question?.mark2)],
          zoom: 15,
          controls: [],
        });
        const sort = new window.Map.Placemark([Number(question?.mark1), Number(question?.mark2)],);
        myMap.geoObjects.add(sort);
      }

      void window.Map.ready(init);
    }
  }, []);
  return <div id="map" style={{ width: '300px', height: '300px' }} />;
}