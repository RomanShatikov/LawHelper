const express = require('express');
const { Question, Theme, Sequelize } = require('../db/models');

const { Op } = Sequelize;

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

indexRouter.post('/questionsPageCount', async (req, res) => {
  try {
    const { id, title } = req.body;
    if (id) {
      const questions = await Question.findAll({
        where: { themeId: id },
      });
      const pageCount = Math.floor(questions.length / 5);
      res.send({ pageCount });
    } else if (title) {
      const questions = await Question.findAll({
        where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), {
          [Op.like]: `%${title.trim().toLowerCase()}%`,
        }),
      });
      const pageCount = Math.floor(questions.length / 5);
      console.log('--------PageCount', pageCount);
      res.send({ pageCount });
    } else {
      const questions = await Question.findAll();
      const pageCount = Math.floor(questions.length / 5);
      res.send({ pageCount });
    }
  } catch (err) {
    console.log(err);
  }
});

indexRouter.post('/paginationQuestions', async (req, res) => {
  try {
    const { id, title, page } = req.body;
    if (id) {
      const questions = await Question.findAll({
        where: { themeId: id },
        order: [['views', 'DESC']],
        offset: (page - 1) * 5,
        limit: 5,
      });
      res.send(questions);
    } else if (title) {
      const questions = await Question.findAll({
        where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), {
          [Op.like]: `%${title.trim().toLowerCase()}%`,
        }),
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

indexRouter.get('/preSearchQuestions', async (req, res) => {
  try {
    const questions = await Question.findAll({
      order: [['views', 'DESC']],
      attributes: ['title'],
      limit: 3,
    });
    res.send(questions);
  } catch (err) {
    console.log(err);
  }
});

indexRouter.post('/intualSearchQuestions', async (req, res) => {
  try {
    const { title } = req.body;
    const questions = await Question.findAll({
      where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), {
        [Op.like]: `%${title.trim().toLowerCase()}%`,
      }),
      order: [['views', 'DESC']],
      attributes: ['title'],
      limit: 3,
    });
    res.send(questions);
  } catch (err) {
    console.log(err);
  }
});

indexRouter.post('/searchQuestions', async (req, res) => {
  try {
    const { title } = req.body;
    const questions = await Question.findAll({
      where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), {
        [Op.like]: `%${title.trim().toLowerCase()}%`,
      }),
      order: [['views', 'DESC']],
    });
    res.send(questions);
  } catch (err) {
    console.log(err);
  }
});

indexRouter.get('/firstQuestionsById/:id', async (req, res) => {
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

indexRouter.get('/firstQuestionsByTitle/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const questions = await Question.findAll({
      where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), {
        [Op.like]: `%${title.trim().toLowerCase()}%`,
      }),
      order: [['views', 'DESC']],
      limit: 5,
    });
    res.send(questions);
  } catch (err) {
    console.log(err);
  }
});

module.exports = indexRouter;
