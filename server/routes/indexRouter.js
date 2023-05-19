const express = require('express');
const { Question } = require('../db/models');

const indexRouter = express.Router();

indexRouter.get('/firstQuestions', async (req, res) => {
  try {
    const questions = await Question.findAll({
      order: [['views', 'DESC']],
      limit: 5,
    });
    res.send(questions);
  } catch (err) {
    console.log(err);
  }
});

indexRouter.get('/questionsPageCount', async (req, res) => {
  try {
    const questions = await Question.findAll();
    const pageCount = Math.floor(questions.length / 5);
    res.send({ pageCount });
  } catch (err) {
    console.log(err);
  }
});

indexRouter.post('/paginationQuestions', async (req, res) => {
  try {
    const { page } = req.body;
    const questions = await Question.findAll({
      order: [['views', 'DESC']],
      offset: (page - 1) * 5,
      limit: 5,
    });
    res.send(questions);
  } catch (err) {
    console.log(err);
  }
});

module.exports = indexRouter;
