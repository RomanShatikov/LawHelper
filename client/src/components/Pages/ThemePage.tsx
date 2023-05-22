import React, { useEffect } from 'react';
import SearchInputTheme from '../UI/SearchInputTheme';
import SearchInputQuest from '../UI/SearchInputQuest';
import { Button } from 'reactstrap';
import Pagination from '@mui/material/Pagination';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { ThemeType } from '../../types/theme/themeType';
import axios from 'axios';
import { getFirstThemes, getThemesByPage } from '../../features/redux/slices/themes/themeThunk';
import MediaCard from '../UI/MediaCard';
import { useParams } from 'react-router-dom';

export default function ThemePage(): JSX.Element {
  const themes = useAppSelector<ThemeType[]>((state) => state.theme.themes);
  const [pageCount, setPageCount] = React.useState(0);
  const dispatch = useAppDispatch();
  const { title } = useParams();

  useEffect(() => {
    axios
      .post('/themesPageCount', { title })
      .then((res) => setPageCount(res.data.pageCount))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .post('/themesPageCount', { title })
      .then((res) => setPageCount(res.data.pageCount))
      .catch((err) => console.log(err));
  }, [title]);

  useEffect(() => {
    dispatch(getFirstThemes(title));
  }, []);

  useEffect(() => {
    dispatch(getFirstThemes(title));
  }, [title]);

  const paginationHandler = (e) => {
    const page = Number(e.target.textContent);
    dispatch(getThemesByPage(title, page));
  };
  return (
    <>
      <SearchInputQuest />
      <SearchInputTheme />
      {pageCount ? <Pagination count={pageCount} onClick={(e) => paginationHandler(e)} /> : null}
      {themes.length ? themes?.map((theme) => (
        <MediaCard key={theme?.id} title={theme?.title} id={theme?.id} />
      )) : <p>Тут ничего нет, попробуйте поискать другую тему</p> }
    </>
  );
}
