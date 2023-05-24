import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Dropdown, Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import type { ThemeType } from '../../types/theme/themeType';
import { useAppSelector } from '../../features/hooks';
import { getAllThemes } from '../../features/redux/slices/themes/themeThunk';
import { deleteRequestThunk } from '../../features/redux/slices/request/requestThunk';
import { submitQuestion } from '../../features/redux/slices/questions/questionsThunk';
import type { RequestType } from '../../types/request/requestType';

type State = {
  theme: number;
  title: string;
  question: string;
  answer: string;
  urlDoc: string;
};

type Props = {
  showModal: boolean;
  onHide: () => void;
  selectedItem: RequestType | null;
};

export default function ModalPage({ showModal, onHide, selectedItem }: Props): JSX.Element {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [inputs, setInputs] = useState<State>({
    theme: 0,
    question: '',
    title: '',
    answer: '',
    urlDoc: '',
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

  const handleDeleteRequest = (): void => {
    dispatch(deleteRequestThunk(selectedItem.id));
    setTitle('');
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(submitQuestion(inputs));
    setShowForm(false);
    setInputs({
      theme: 0,
      title: '',
      question: '',
      answer: '',
      urlDoc: '',
    });
  };
  useEffect(() => {
    dispatch(getAllThemes(null));
  }, []);

  return (
    <Modal show={showModal} onHide={onHide} size="lg" className="modal">
      <Modal.Header closeButton>
        <Modal.Title>Добавить новый запрос</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="title">{selectedItem?.title}</p>
        <p className="feedback">{selectedItem?.feedback}</p>
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
            <Button variant="primary" onClick={() => setShowForm(true)}>
              Заполнить
            </Button>
          ) : (
            <Button variant="primary" onClick={() => setShowForm(false)}>
              Скрыть
            </Button>
          )}
        </div>
        {showForm && (
          <Form>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {title || 'Выберите тему'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {themes?.map((theme: ThemeType) => (
                  <Dropdown.Item key={theme?.id} onClick={() => handleThemeChange(theme)}>
                    {theme?.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Group controlId="input2">
              <Form.Label>Вопрос</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={inputs?.title}
                onChange={handleChangeState}
              />
            </Form.Group>
            <Form.Group controlId="input2">
              <Form.Label>Ответ</Form.Label>
              <Form.Control
                type="text"
                name="answer"
                value={inputs?.answer}
                onChange={handleChangeState}
              />
            </Form.Group>
            <Form.Group controlId="input2">
              <Form.Label>Ссылка на источник (url)</Form.Label>
              <Form.Control
                type="text"
                name="urlDoc"
                value={inputs?.urlDoc}
                onChange={handleChangeState}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      {showForm && (
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={(e) => submitHandler}>
            Добавить
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}
