const express = require('express');
const { Favorite, Request } = require('../db/models');

const crudRouter = express.Router();

crudRouter.post('/favorite', async (req, res) => {
  try {
    const { userId, questionId } = req.body;
    const favorite = await Favorite.create({ userId, questionId });
    res.send(favorite);
  } catch (err) {
    console.log(err);
  }
});

crudRouter.post('/delFavorite', async (req, res) => {
  try {
    const { userId, questionId } = req.body;
    console.log('---------', userId, questionId);
    await Favorite.destroy({ where: { userId, questionId } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

crudRouter.post('/request', async (req, res) => {
  try {
    const { title, userId } = req.body;
    console.log('---------', req.body);
    console.log('---------', title, userId);
    const request = await Request.create({ title, userId });
    res.send(request);
  } catch (err) {
    console.log(err);
  }
});

module.exports = crudRouter;
