const express = require('express');
const { Question, Theme } = require('../db/models');

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

indexRouter.get('/firstQuestions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const questions = await Question.findAll({
      where: { themeId: id },
      order: [['views', 'DESC']],
      limit: 5,
    });
    res.send(questions);
  } catch (err) {
    console.log(err);
  }
});

indexRouter.post('/questionsPageCount', async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      const questions = await Question.findAll({
        where: { themeId: id },
      });
      const pageCount = Math.floor(questions.length / 5);
      console.log('---------pageCount withId', pageCount);
      res.send({ pageCount });
    } else {
      const questions = await Question.findAll();
      const pageCount = Math.floor(questions.length / 5);
      console.log('---------pageCount withoutId', pageCount);
      res.send({ pageCount });
    }
  } catch (err) {
    console.log(err);
  }
});

indexRouter.post('/paginationQuestions', async (req, res) => {
  try {
    const { id, page } = req.body;
    if (id) {
      const questions = await Question.findAll({
        where: { themeId: id },
        order: [['views', 'DESC']],
        offset: (page - 1) * 5,
        limit: 5,
      });
      res.send(questions);
    } else {
      const questions = await Question.findAll({
        order: [['views', 'DESC']],
        offset: (page - 1) * 5,
        limit: 5,
      });
      res.send(questions);
    }
  } catch (err) {
    console.log(err);
  }
});

indexRouter.get('/themesPageCount', async (req, res) => {
  try {
    const themes = await Theme.findAll();
    const pageCount = Math.floor(themes.length / 5);
    res.send({ pageCount });
  } catch (err) {
    console.log(err);
  }
});

indexRouter.get('/firstThemes', async (req, res) => {
  try {
    const themes = await Theme.findAll({
      limit: 5,
    });
    res.send(themes);
  } catch (err) {
    console.log(err);
  }
});

indexRouter.post('/paginationThemes', async (req, res) => {
  try {
    const { page } = req.body;
    const themes = await Theme.findAll({
      offset: (page - 1) * 5,
      limit: 5,
    });
    res.send(themes);
  } catch (err) {
    console.log(err);
  }
});

module.exports = indexRouter;
