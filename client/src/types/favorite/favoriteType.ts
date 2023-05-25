import { QueryTypes } from "sequelize";
import type { QuestionType } from "../questions/questionType";

export type FavoriteType = {
  id: number;
  userId: number;
  questionId: number;
  Question: QuestionType;
};

export type FavoriteArg = {
  userId?: number;
  questionId?: number;
};
