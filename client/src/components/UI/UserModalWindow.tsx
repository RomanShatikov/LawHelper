import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { addRequest } from '../../features/redux/slices/request/requestThunk';
import { UserType } from '../../types/user/userType';

type UserModalWindowProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserModalWindow({
  showModal,
  setShowModal,
}: UserModalWindowProps): JSX.Element {
  const [input, setInut] = React.useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector<UserType>((state) => state.user);

  const handlerHide = (): void => {
    setShowModal((prev) => !prev);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setShowModal(false);
    setInut('');
    if (user.status === 'active') dispatch(addRequest({ userId: user.id, title: input }));
  };

  return (
    <Modal show={showModal} onHide={handlerHide} size="lg" className="modal">
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
