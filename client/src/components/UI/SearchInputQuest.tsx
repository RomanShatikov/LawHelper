import { Autocomplete, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { QuestionType } from '../../types/questions/questionType';
import { useNavigate } from 'react-router-dom';
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
    <form onSubmit={(e) => submitHandler(e)}>
      <Autocomplete
        id="free-solo-demo"
        selectOnFocus
        clearOnBlur
        freeSolo
        options={questsInInput.map((option) => ({ label: option.title, id: option.id }))}
        onInputChange={(event, newInputValue) => {
          setInput(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Вопрос" name="title" />}
      />
      <Button type="submit" variant="contained">
        Найти
      </Button>
    </form>
  );
}
