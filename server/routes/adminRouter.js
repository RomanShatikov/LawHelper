const express = require('express');

const { Request, Question, Theme, Document } = require('../db/models');

const adminRouter = express.Router();

adminRouter.route('/').get(async (req, res) => {
  const allRequests = await Request.findAll({
    include: ['user'],
  });
  res.json(allRequests);
});
module.exports = adminRouter;

adminRouter.route('/request/:id').delete(async (req, res) => {
  try {
    await Request.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

adminRouter.route('/questions').post(async (req, res) => {
  try {
    const newQuestion = await Question.create({ ...req.body, themeId: req.body.theme });
    console.log(req.body);
    const newQuestionWithThemeAnswer = await Question.findOne({
      where: { id: newQuestion.id },
      include: [Theme, Document],
    });
    res.json(newQuestionWithThemeAnswer);
  } catch (e) {
    console.log(e);
  }
});
