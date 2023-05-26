const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const path = require('path');
const { Request, Question, Theme, Document } = require('../db/models');

const adminRouter = express.Router();
adminRouter.route('/').get(async (req, res) => {
  const allRequests = await Request.findAll({
    include: ['user'],
  });
  res.json(allRequests);
});
adminRouter.route('/request/:id').delete(async (req, res) => {
  await Request.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
});
adminRouter.route('/questions').post(upload.single('urlDoc'), async (req, res) => {
  try {
    const { theme, title, answer } = req.body;
    const urlDoc = req.file ? req.file.path : null; // Получаем путь к загруженному файлу
    // Создаем новый вопрос
    const newQuestion = await Question.create({
      themeId: theme,
      title,
      answer,
    });
    // Если файл был загружен, создаем новый документ
    if (urlDoc) {
      await Document.create({
        questionId: newQuestion.id,
        urlDoc,
        title: encodeURIComponent(req.file.originalname),
      });
    }
    // Получаем новый вопрос с темой и документом
    const newQuestionWithThemeAnswer = await Question.findOne({
      where: { id: newQuestion.id },
      include: [Theme, Document],
    });
    res.json(newQuestionWithThemeAnswer);
  } catch (error) {
    console.error('Error submitting question:', error);
    res.status(500).send('Server Error');
  }
});
const getOriginalName = async (filename) => {
  const document = await Document.findOne({ where: { urlDoc: `uploads/${filename}` } });
  return decodeURIComponent(document.title);
};
adminRouter.get('/downloads/:filename', async (req, res) => {
  try {
    // Get the original name of the file from the database, based on req.params.filename
    // I will assume that you have a function named 'getOriginalName' that does this
    const originalName = await getOriginalName(req.params.filename);
    console.log('00000000originalName00000000', originalName);
    // Set the header to ensure file is downloaded with the original name
    res.setHeader('Content-Disposition', `attachment; filename=${originalName}`);
    // Send the file
    res.sendFile(path.join(__dirname, `../uploads/${req.params.filename}`));
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).send('Server Error');
  }
});
module.exports = adminRouter;
