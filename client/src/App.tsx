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
import type { UserType } from './types/user/userType';
import Loader from './components/HOC/Loader';

function App(): JSX.Element {
  const user = useAppSelector<UserType>((store) => store.user);
  console.log(user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserThunk());
  }, []);

  return (
    <Container style={{ minWidth: '100vw', margin: 0, minHeight: '100vh', padding: 0}}>
      <Loader>
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              element={
                <PrivateRoute isAllowed={user.status === 'guest' || user.status === 'non-active'} />
              }
            >
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route
              element={<PrivateRoute isAllowed={user.status === 'active'} redirectPath="/login" />}
            >
              <Route path="/cabinet/favorites" element={<CabinetPage />} />
              <Route path="/cabinet/requests" element={<CabinetPage />} />
            </Route>

            <Route
              element={<PrivateRoute isAllowed={user?.status === 'active' && user?.isAdmin === true} redirectPath="/login" />}
            >
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
