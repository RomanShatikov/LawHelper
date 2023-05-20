import { Autocomplete, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
];

export default function SearchInputQuest(): JSX.Element {
  const [questions, setQuestions] = React.useState([]);
  const [input, setInput] = React.useState('');

  React.useEffect(() => {
    axios('/preSearchQuestions')
      .then((res) => setQuestions(res.data))
      .catch((e) => console.log(e));
  }, []);

  console.log(questions);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      axios
        .post('/searchQuestions', { title: input })
        .then((res) => setQuestions(res.data))
        .catch((e) => console.log(e));
    }, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [input]);

  console.log(questions);

  return (
    <Stack>
      <Autocomplete
        id="free-solo-demo"
        selectOnFocus
        clearOnBlur
        freeSolo
        options={questions.map((option) => option.title)}
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
    </Stack>
  );
}
