/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { Row } from 'reactstrap';
import SearchInputTheme from '../UI/SearchInputTheme';
import SearchInputQuest from '../UI/SearchInputQuest';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import type { ThemeType } from '../../types/theme/themeType';
import { getFirstThemes, getThemesByPage } from '../../features/redux/slices/themes/themeThunk';
import MediaCard from '../UI/MediaCard';

type PageCountResponse = {
  pageCount: number;
};

export default function ThemePage(): JSX.Element {
  const themes = useAppSelector<ThemeType[]>((state) => state.theme.themes);
  const [pageCount, setPageCount] = React.useState<number>(0);
  const dispatch = useAppDispatch();
  const { title } = useParams();

  useEffect(() => {
    axios
      .post('/themesPageCount', { title })
      .then((res: AxiosResponse<PageCountResponse>) => setPageCount(res.data.pageCount))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .post('/themesPageCount', { title })
      .then((res: AxiosResponse<PageCountResponse>) => setPageCount(res.data.pageCount))
      .catch((err) => console.log(err));
  }, [title]);

  useEffect(() => {
    dispatch(getFirstThemes(title!));
  }, []);

  useEffect(() => {
    dispatch(getFirstThemes(title!));
  }, [title]);

  const paginationHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    if (!(e.target instanceof HTMLElement)) return;

    const page = Number(e.target.textContent);
    dispatch(getThemesByPage({ title, page }));
  };
  return (
    <>
      <div style={{ margin: 'auto', width: '70%', marginBottom: '2%' }}>
        <SearchInputQuest />
        <SearchInputTheme />
      </div>
      {pageCount ? (
        <Pagination
          count={pageCount}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1%',
            justifyContent: 'center',
          }}
          color="primary"
          onClick={(e) => paginationHandler(e)}
        />
      ) : null}
      {themes.length ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10%',
            alignContent: 'center',
            alignItems: 'center',
            marginLeft: '20%'
          }}
        >
          {themes?.map((theme) => (
            <MediaCard key={theme?.id} title={theme?.title} id={theme?.id} />
          ))}
        </div>
      ) : (
        <p>Тут ничего нет, попробуйте поискать другую тему</p>
      )}
    </>
  );
}
