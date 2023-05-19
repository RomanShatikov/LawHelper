import React, { useEffect } from 'react'
import SearchInputTheme from '../UI/SearchInputTheme';
import SearchInputQuest from '../UI/SearchInputQuest';
import { Button } from 'reactstrap';
import Pagination from '@mui/material/Pagination';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { ThemeType } from '../../types/theme/themeType';
import axios from 'axios';
import { getFirstThemes, getThemesByPage } from '../../features/redux/slices/themes/themeThunk';
import MediaCard from '../UI/MediaCard';

export default function ThemePage():JSX.Element {
  const themes = useAppSelector<ThemeType[]>((state) => state.theme.themes);
  const [pageCount, setPageCount] = React.useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios('/themesPageCount')
      .then((res) => setPageCount(res.data.pageCount))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    dispatch(getFirstThemes());
  }, []);

  const paginationHandler = (e) => {
    const page = Number(e.target.textContent);
    dispatch(getThemesByPage(page));
  };
  return (
    <>
      <form>
        <SearchInputQuest />
        <Button type="submit" variant="outlined">
          Найти
        </Button>
      </form>
      <form>
        <SearchInputTheme />
        <Button type="submit" variant="outlined">
          Найти
        </Button>
      </form>
      <Pagination count={pageCount} onClick={(e) => paginationHandler(e)} />
      {themes?.map((theme) => (
        <MediaCard key={theme?.id} title={theme?.title} id={theme?.id} />
      ))}
    </>
  );
}
