const express = require('express');
const { Question } = require('../db/models');

const indexRouter = express.Router();

indexRouter.get('/questions', async (req, res) => {
  try {
    const questions = await Question.findAll({
      order: [['views', 'DESC']],
    });
    console.log(questions);
    res.send(questions);
  } catch (err) {
    console.log(err);
  }
});

module.exports = indexRouter;
