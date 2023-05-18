import axios from 'axios';
import type { ThunkActionCreater } from '../../store';

export const getAllQuestions = () => async (dispatch) => {
    const res = await axios('/questions')
    
};
