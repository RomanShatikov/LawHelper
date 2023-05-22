import { QueryTypes } from "sequelize";
import { QuestionType } from "../questions/questionType";

export type FavoriteType = {
  id: number;
  userId: number;
  questionId: number;
  Question: QuestionType;
};
