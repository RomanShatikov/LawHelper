import { QueryTypes } from "sequelize";
import type { QuestionType } from "../questions/questionType";

export type FavoriteType = {
  id: number;
  userId: number;
  questionId: number;
  Question: QuestionType;
};
