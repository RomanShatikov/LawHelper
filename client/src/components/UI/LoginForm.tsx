import React from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { Input, Label } from 'reactstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { loginUserThunk } from '../../features/redux/slices/user/thunkActions';
import type { LoginForm } from '../../types/user/formTypes';
import { useAppDispatch, useAppSelector } from '../../features/hooks';

export default function LogForm(): JSX.Element {
  const erors = useAppSelector((state) => state.eror);
  console.log(erors);
  const [isVisible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget))as LoginForm
    dispatch(loginUserThunk(data));
  };


  return (
    <Form onSubmit={handleSubmit}>

      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input id="exampleEmail" name="email"  type="email" />
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
         
          type="password"
        />
      </FormGroup>
      <Button type='submit'>Войти</Button>
    </Form>
  );
}

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: 'black' }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Login
//         </Typography>
//         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 autoComplete="given-name"
//                 name="email"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Почта"
//                 value={input.email || ''}
//                 onChange={inputHandler}
//                 autoFocus
//               />
//               {error.firstName && <p>{error.firstName}</p>}
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 required
//                 fullWidth
//                 id="password"
//                 label="Пароль"
//                 name="password"
//                 value={input.password || ''}
//                 onChange={inputHandler}
//                 autoComplete="family-name"
//               />
//               {error.password && <p>{error.password}</p>}
//             </Grid>
//           </Grid>

//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//             Войти
//           </Button>
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Link component={RouterLink} to="/login" variant="body2">
//                 Уже есть аккаунт? Войдите
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// }
