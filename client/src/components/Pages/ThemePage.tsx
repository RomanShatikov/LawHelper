import React, { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SearchInputTheme from '../UI/SearchInputTheme';
import SearchInputQuest from '../UI/SearchInputQuest';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import type { ThemeType } from '../../types/theme/themeType';
import { getFirstThemes, getThemesByPage } from '../../features/redux/slices/themes/themeThunk';
import MediaCard from '../UI/MediaCard';

type PageCountFromBackend = {
  pageCount: number;
};

export default function ThemePage(): JSX.Element {
  const themes = useAppSelector<ThemeType[]>((state) => state.theme.themes);
  const [pageCount, setPageCount] = React.useState(0);
  const dispatch = useAppDispatch();
  const { title } = useParams();

  useEffect(() => {
    axios
      .post<PageCountFromBackend>('/themesPageCount', { title })
      .then((res) => setPageCount(res.data.pageCount))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .post<PageCountFromBackend>('/themesPageCount', { title })
      .then((res) => setPageCount(res.data.pageCount))
      .catch((err) => console.log(err));
  }, [title]);

  useEffect(() => {
    dispatch(getFirstThemes({ title }));
  }, []);

  useEffect(() => {
    dispatch(getFirstThemes({ title }));
  }, [title]);

  const paginationHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const target = e.target as HTMLElement;
    const page = Number(target.textContent);
    dispatch(getThemesByPage({ title, page }));
  };
  return (
    <>
      <SearchInputQuest />
      <SearchInputTheme />
      {pageCount ? <Pagination count={pageCount} onClick={(e) => paginationHandler(e)} /> : null}
      {themes.length ? (
        themes?.map((theme) => <MediaCard key={theme?.id} title={theme?.title} id={theme?.id} />)
      ) : (
        <p>Тут ничего нет, попробуйте поискать другую тему</p>
      )}
    </>
  );
}
