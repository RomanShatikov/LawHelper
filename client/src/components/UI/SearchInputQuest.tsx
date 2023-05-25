import { Autocomplete, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import type { QuestionType } from '../../types/questions/questionType';
import SearchIcon from '@mui/icons-material/Search';
import { getFirstQuestions } from '../../features/redux/slices/questions/questionsThunk';

type QuestFromBackend = {
  title: string;
  id: number;
};

export default function SearchInputQuest(): JSX.Element {
  const questions = useAppSelector<QuestionType[]>((state) => state.question.questions);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [questsInInput, setQuestsInInput] = React.useState<QuestFromBackend[]>([]);
  const [input, setInput] = React.useState('');

  React.useEffect(() => {
    axios('/preSearchQuestions')
      .then((res) => setQuestsInInput(res.data))
      .catch((e) => console.log(e));
  }, []);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      axios
        .post('/intualSearchQuestions', { title: input })
        .then((res) => setQuestsInInput(res.data))
        .catch((e) => console.log(e));
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [input]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate(`/question/${input}`);
  };

  return (
    <form onSubmit={(e) => submitHandler(e)} style={{ width: '100%' }}>
      <div style={{ width: '100%' }}>
        <Autocomplete
          id="free-solo-demo"
          selectOnFocus
          clearOnBlur
          freeSolo
          style={{ width: '100%' }}
          options={questsInInput.map((option) => ({ label: option.title, id: option.id }))}
          onInputChange={(event, newInputValue) => {
            setInput(newInputValue);
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                style: {
                  color: 'black',
                  backgroundColor: 'white',
                  width: '100%',
                },
              }}
              label="Введите вопрос"
              name="title"
              style={{ borderRadius: '10px' }}
            />
          )}
        />
      </div>
    </form>
  );
}
