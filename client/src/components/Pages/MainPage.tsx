import React from 'react';
import NavBar from '../UI/NavBar';
import SearchInputQuest from '../UI/SearchInputQuest';
import SearchInputTheme from '../UI/SearchInputTheme';

export default function MainPage(): JSX.Element {
  return (
    <div>
      <div className="img">
        <div className="titleContainer">
          <div className="container text-white" />
          <div>
            <div className="inputContainer">
              <SearchInputQuest />
              <SearchInputTheme />
            </div>
            <div>
              <h1 className="bold-text">
                LawHelper - сервис, который позволяет получить нужный ответ на интересующий
                юридический вопрос без чтения законов
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
