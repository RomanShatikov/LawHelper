import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Modal, Button, Form, Row, Col, Container } from 'react-bootstrap';
import type { RequestType } from '../../types/request/requestType';
import ModalPage from './ModalPage';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { getRequests, loadRequests } from '../../features/redux/slices/request/requestThunk';

export default function TransactionList(): JSX.Element {
  const requests = useAppSelector((store) => store.request.requests);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RequestType | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadRequests());
  }, []);
  const handleCardClick = (request: RequestType): void => {
    setSelectedItem(request);
    setShowModal(true);
  };
  return (
    <Container>
      <Row>
        <Col>
          <ListGroup style={{ margin: 'auto',marginTop: '20px', marginBottom: '20px', width: '80%'}}>
            {requests.map((request: RequestType) => (
              <ListGroup.Item
                key={request.id}
                action
                style={{backgroundColor: 'white',  margin: '3px', borderRadius: '8px'}}
                variant="secondary"
                onClick={() => handleCardClick(request)}
              >
                {request.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      {showModal && (
        <ModalPage
          showModal={showModal}
          onHide={() => setShowModal(false)}
          selectedItem={selectedItem}
        />
      )}
    </Container>
  );
}
