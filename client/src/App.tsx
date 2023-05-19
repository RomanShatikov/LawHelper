import React from 'react';
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

function App(): JSX.Element {
  return (
    <Container>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cabinet" element={<CabinetPage/>} />
        <Route path="/theme" element={<ThemePage />} />
        <Route path="/question" element={<QuestionsPage/>} />
        <Route path="/answer/:id" element={<AnswerPage />} />
      </Routes>
    </Container>
  );
}

export default App;
