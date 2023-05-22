export type QuestionType = {
  id: number;
  title: string;
  answer: string;
  themeId: number ;
  views: string;
  
}; // описали тип модели Question

export type QuestionSliceType = {
  questions: QuestionType[] | [];
  currentQuestion: QuestionType | null;
};
