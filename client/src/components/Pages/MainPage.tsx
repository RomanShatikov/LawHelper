import React from 'react';
import NavBar from '../UI/NavBar';
import SearchInputQuest from '../UI/SearchInputQuest';
import SearchInputTheme from '../UI/SearchInputTheme';

export default function MainPage():JSX.Element {
  return <div>
    <SearchInputQuest/>
    <SearchInputTheme/>
  </div>;
}
