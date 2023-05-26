// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Dropdown, Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import type { ThemeType } from '../../types/theme/themeType';
import { useAppSelector } from '../../features/hooks';
import { getFirstThemes } from '../../features/redux/slices/themes/themeThunk';
import { deleteRequest } from '../../features/redux/slices/request/requestSlice';
import { deleteRequestThunk } from '../../features/redux/slices/request/requestThunk';
import { submitQuestion } from '../../features/redux/slices/questions/questionsThunk';

type State = {
  theme: number;
  question: string;
  answer: string;
  urlDoc: string;
};

export default function ModalPage({ showModal, onHide, selectedItem }): JSX.Element {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [inputs, setInputs] = useState<State>({
    theme: null,
    title: '',
    answer: '',
    urlDoc: null,
  });
  const [title, setTitle] = useState('');
  const themes = useAppSelector<ThemeType[]>((state) => state.theme.themes);

  const handleChangeState = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleThemeChange = (selectedTheme: ThemeType): void => {
    setTitle(selectedTheme.title);
    setInputs((prevState) => ({
      ...prevState,
      theme: selectedTheme.id,
    }));
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputs((prevState) => ({
      ...prevState,
      urlDoc: e.target.files ? e.target.files[0] : null,
    }));
  };

  const handleDeleteRequest = (): void => {
    dispatch(deleteRequestThunk(selectedItem.id));
    setTitle('');
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('theme', inputs.theme);
    formData.append('title', inputs.title);
    formData.append('answer', inputs.answer);
    if (inputs.urlDoc) {
      formData.append('urlDoc', inputs.urlDoc);
    }
    dispatch(submitQuestion(formData));
    setShowForm(false);
    setInputs({
      theme: null,
      title: '',
      answer: '',
      urlDoc: null,
    });
    onHide();
  };

  useEffect(() => {
    dispatch(getFirstThemes());
  }, []);

  return (
    <Modal show={showModal} onHide={onHide} size="lg" className="modal">
      <Modal.Header closeButton>
        <Modal.Title>Добавить новый запрос</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="title">{selectedItem.title}</p>
        <p className="feedback">{selectedItem.feedback}</p>
        <div className="buttons">
          <Button
            variant="secondary"
            onClick={() => {
              handleDeleteRequest();
              onHide();
            }}
          >
            Удалить
          </Button>
          {!showForm ? (
            <Button
              variant="primary"
              style={{ marginLeft: '10px' }}
              onClick={() => setShowForm(true)}
            >
              Заполнить
            </Button>
          ) : (
            <Button
              variant="primary"
              style={{ marginLeft: '10px' }}
              onClick={() => setShowForm(false)}
            >
              Скрыть
            </Button>
          )}
        </div>
        {showForm && (
          <Form style={{ marginTop: '10px' }}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {title || 'Выберите тему'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {themes?.map((theme) => (
                  <Dropdown.Item key={theme.id} onClick={() => handleThemeChange(theme)}>
                    {theme.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Group controlId="input2">
              <Form.Label>Вопрос</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={inputs.title}
                onChange={handleChangeState}
              />
            </Form.Group>
            <Form.Group controlId="input2">
              <Form.Label>Ответ</Form.Label>
              <Form.Control
                type="text"
                name="answer"
                value={inputs.answer}
                onChange={handleChangeState}
              />
            </Form.Group>
            <Form.Group controlId="input2">
              <Form.Label>Ссылка на источник (url)</Form.Label>
              <Form.Control type="file" name="urlDoc" onChange={handleChangeFile} />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      {showForm && (
        <Modal.Footer style={{ marginLeft: '10px' }}>
          <Button variant="secondary" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            Добавить
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}
