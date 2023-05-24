import type { FavoriteType } from '../favorite/favoriteType';

export type QuestionType = {
  id: number;
  title: string;
  answer: string;
  themeId: number;
  views: string;
  mark1: string;
  mark2: string;
}; // описали тип модели Question

export type QuestionSliceType = {
  questions: QuestionType[] | [];
  favorites: FavoriteType[] | [];
  currentQuestion: QuestionType | null;
};
