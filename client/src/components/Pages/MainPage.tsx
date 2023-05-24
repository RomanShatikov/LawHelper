import React from 'react';
import NavBar from '../UI/NavBar';
import SearchInputQuest from '../UI/SearchInputQuest';
import SearchInputTheme from '../UI/SearchInputTheme';

export default function MainPage(): JSX.Element {
  return (
    <div>
      <div className="img">
        <div className="container text-white">
          <h1 className="bold-text py-6">
            LawHelper - сервис, который позволяет получить нужный ответ на интересующий юридический
            вопрос без чтения законов
          </h1>
        </div>
        <div className="search-input-container">
          <div style={{ padding: '10px' }}>
            <SearchInputQuest />
          </div>
          <div>
            <SearchInputTheme />
          </div>
        </div>
      </div>
    </div>
  );
}
