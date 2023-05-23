const express = require('express');
const { Question, Theme, Favorite, Request, Sequelize, Document } = require('../db/models');

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
      const pageCount = Math.ceil(questions.length / 5);
      res.send({ pageCount });
    } else if (title) {
      const questions = await Question.findAll({
        where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), {
          [Op.like]: `%${title.trim().toLowerCase()}%`,
        }),
      });
      const pageCount = Math.ceil(questions.length / 5);
      res.send({ pageCount });
    } else {
      const questions = await Question.findAll();
      const pageCount = Math.ceil(questions.length / 5);
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

indexRouter.post('/themesPageCount', async (req, res) => {
  try {
    const { title } = req.body;
    if (title) {
      const themes = await Theme.findAll({
        where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), {
          [Op.like]: `%${title.trim().toLowerCase()}%`,
        }),
      });
      const pageCount = Math.ceil(themes.length / 5);
      res.send({ pageCount });
    } else {
      const themes = await Theme.findAll();
      const pageCount = Math.ceil(themes.length / 5);
      res.send({ pageCount });
    }
  } catch (err) {
    console.log(err);
  }
});

indexRouter.post('/firstThemes', async (req, res) => {
  try {
    const { title } = req.body;
    if (title) {
      const themes = await Theme.findAll({
        where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Theme.title')), {
          [Op.like]: `%${title.trim().toLowerCase()}%`,
        }),
        limit: 5,
      });
      res.send(themes);
    } else {
      const themes = await Theme.findAll({
        limit: 5,
      });
      res.send(themes);
    }
  } catch (err) {
    console.log(err);
  }
});

indexRouter.post('/paginationThemes', async (req, res) => {
  try {
    const { title, page } = req.body;
    if (title) {
      const themes = await Theme.findAll({
        where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Theme.title')), {
          [Op.like]: `%${title.trim().toLowerCase()}%`,
        }),
        offset: (page - 1) * 5,
        limit: 5,
      });
      res.send(themes);
    } else {
      const themes = await Theme.findAll({
        offset: (page - 1) * 5,
        limit: 5,
      });
      res.send(themes);
    }
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

indexRouter.get('/preSearchTheme', async (req, res) => {
  try {
    const themes = await Theme.findAll({
      attributes: [
        'id',
        'title',
        [Sequelize.fn('SUM', Sequelize.col('Questions.views')), 'totalViews'],
      ],
      include: {
        model: Question,
        attributes: [],
      },
      group: ['Theme.id', 'Theme.title'],
      raw: true,
    });
    const sortedThemes = themes.sort((a, b) => b.totalViews - a.totalViews).slice(0, 3);
    res.send(sortedThemes);
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

indexRouter.post('/intualSearchTheme', async (req, res) => {
  try {
    const { title } = req.body;
    const themes = await Theme.findAll({
      where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Theme.title')), {
        [Op.like]: `%${title.trim().toLowerCase()}%`,
      }),
      attributes: [
        'id',
        'title',
        [Sequelize.fn('SUM', Sequelize.col('Questions.views')), 'totalViews'],
      ],
      include: {
        model: Question,
        attributes: [],
      },
      group: ['Theme.id', 'Theme.title'],
      raw: true,
    });
    const sortedThemes = themes.sort((a, b) => b.totalViews - a.totalViews).slice(0, 3);
    res.send(sortedThemes);
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

indexRouter.get('/favorites/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.findAll({
      where: { userId },
      include: {
        model: Question,
      },
      order: [['createdAt', 'DESC']],
      limit: 10,
    });
    res.send(favorites);
  } catch (err) {
    console.log(err);
  }
});

indexRouter.get('/answer/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const answer = await Question.findOne({ include: { model: Document }, where: { id } });
    res.json(answer);
  } catch (err) {
    console.log(err);
  }
});

indexRouter.get('/requests/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const requests = await Request.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 10,
    });
    res.send(requests);
  } catch (err) {
    console.log(err);
  }
});

indexRouter.get('/document/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findOne({ where: { questionId: Number(id) } });
    res.json(document);
  } catch (err) {
    console.log(err);
  }
});

module.exports = indexRouter;
