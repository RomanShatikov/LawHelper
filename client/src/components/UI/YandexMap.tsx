import React, { useEffect } from 'react';
import { Card, Col } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../features/hooks';

export default function YandexMap(): JSX.Element {
  const question = useAppSelector((state) => state.question.currentQuestion);
  console.log(question);
  useEffect(() => {
    if (question && question.mark1 && question.mark2) {
      function init(): void {
        const myMap = new window.ymaps.Map('map', {
          center: [Number(question?.mark1), Number(question?.mark2)],
          zoom: 15,
          controls: [],
        });
        const sort = new window.ymaps.Placemark(
          [Number(question?.mark1), Number(question?.mark2)],

        );
        myMap.geoObjects.add(sort);
      }

      void window.ymaps.ready(init);
    }
  }, []);
  return (
    // <Col md={4} className="mt-5" style={{ marginBottom: '80px', marginRight: '40px' }}>
    //   <Card
    //     sx={{
    //       width: 300,
    //       height: 300,
    //       borderColor: '#16c0ce',
    //       borderWidth: '2px',
    //       borderStyle: 'solid',
    //       borderRadius: '20px',
    //       fontSize: '1em',
    //     }}
    //   >
        <div id="map" style={{ width: '300px', height: '300px' }} />
    //   </Card>
    // </Col>
  );
}
