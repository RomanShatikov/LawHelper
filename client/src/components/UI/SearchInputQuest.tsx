import { Autocomplete, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { QuestionType } from '../../types/questions/questionType';
import { useNavigate } from 'react-router-dom';
import { getFirstQuestions } from '../../features/redux/slices/questions/questionsThunk';

export default function SearchInputQuest(): JSX.Element {
  const questions = useAppSelector<QuestionType[]>((state) => state.question.questions);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [questsInInput, setQuestsInInput] = React.useState([]);
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
    <form onSubmit={(e) => submitHandler(e)}>
      <Autocomplete
        id="free-solo-demo"
        selectOnFocus
        clearOnBlur
        freeSolo
        options={questsInInput.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Вопрос"
            name="title"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        )}
      />
      <Button type="submit" variant="contained">
        Contained
      </Button>
    </form>
  );
}
