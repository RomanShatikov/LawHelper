import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'reactstrap';
import AdminPage from './components/Pages/AdminPage';
import LoginPage from './components/Pages/LoginPage';
import MainPage from './components/Pages/MainPage';
import SignUpPage from './components/Pages/SignUpPage';
import NavBar from './components/UI/NavBar';
import CabinetPage from './components/Pages/CabinetPage';
import ThemePage from './components/Pages/ThemePage';
import QuestionsPage from './components/Pages/QuestionsPage';
import AnswerPage from './components/Pages/AnswerPage';
import { useAppDispatch, useAppSelector } from './features/hooks';
import PrivateRoute from './components/HOC/PrivateRouter';
import { checkUserThunk } from './features/redux/slices/user/thunkActions';
import Loader from './components/HOC/Loader';

function App(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const userAdmin = useAppSelector((store) => store.userAdmin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserThunk());
  }, []);

  return (
    <Container>
      <Loader>
        <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<PrivateRoute isAllowed={user.status === 'guest'} />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route
          element={<PrivateRoute isAllowed={user.status === 'logged'} redirectPath="/login" />}
        >
          <Route path="/cabinet/favorites" element={<CabinetPage />} />
          <Route path="/cabinet/requests" element={<CabinetPage />} />
        </Route>

        <Route element={<PrivateRoute isAllowed={user.isAdmin === true} redirectPath="/login" />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route path="/theme" element={<ThemePage />} />
        <Route path="/question" element={<QuestionsPage />} />
        <Route path="/themes/:title" element={<ThemePage />} />
        <Route path="/theme/:id" element={<QuestionsPage />} />
        <Route path="/question/:title" element={<QuestionsPage />} />
        <Route path="/answer/:id" element={<AnswerPage />} />
      </Routes>
      </>
      </Loader>
    </Container>
  );
}

export default App;
