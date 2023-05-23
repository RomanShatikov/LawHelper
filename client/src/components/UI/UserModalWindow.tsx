import React from 'react';
import { Modal, Button, Dropdown, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { addRequest } from '../../features/redux/slices/request/requestThunk';

type UserModalWindow = {
  showModal: boolean;
};

export default function UserModalWindow({ showModal, setShowModal }: UserModalWindow): JSX.Element {
  const [input, setInut] = React.useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(false);
    setInut('');
    dispatch(addRequest({ userId: user.id, title: input }));
  };
  
  return (
    <Modal show={showModal} onHide={setShowModal} size="lg" className="modal">
      <Modal.Header closeButton>
        <Modal.Title>Отправить предложение</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Control
            type="text"
            name="title"
            value={input}
            onChange={(e) => setInut(e.target.value)}
          />
          <Button variant="primary" type="submit">
            Отправить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
