import React from 'react';
import NavBar from '../UI/NavBar';
import SearchInputQuest from '../UI/SearchInputQuest';
import SearchInputTheme from '../UI/SearchInputTheme';

export default function MainPage(): JSX.Element {
  return (
    <div>
      <div className="img">
        <div className="container text-white" />
        <div
          style={{
            // display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <div style={{ padding: '10px' }}>
            <SearchInputQuest />
          </div>
          <div style={{ padding: '10px' }}>
            <SearchInputTheme />
            <h1 className="bold-text py-6" style={{ margin: 'auto' }}>
              LawHelper - сервис, который позволяет получить нужный ответ на интересующий
              юридический вопрос без чтения законов
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
