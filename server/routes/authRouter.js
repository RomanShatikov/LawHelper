const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { User } = require('../db/models');
const sendEmail = require('../nodemailer');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  const hashpass = await bcrypt.hash(password, 10);

  const confirmationCode = crypto.randomBytes(20).toString('hex');

  const [foundUser, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      firstName,
      lastName,
      hashpass,
      confirmationCode,
    },
  });

  if (!created) return res.status(401).json({ message: 'e-mail уже зарегистрирован' });

  sendEmail(foundUser, confirmationCode);

  return res.json({ message: 'Письмо с подтверждением отправлено' });
});

authRouter.get('/confirm/:confirmationCode', async (req, res) => {
  const { confirmationCode } = req.params;
  console.log(confirmationCode);
  const foundUser = await User.findOne({ where: { confirmationCode } });

  if (!foundUser) {
    return res.status(404).json({ message: 'Неверный код подтверждения' });
  }

  foundUser.confirmed = true;

  await User.update({ confirmed: true }, { where: { id: foundUser.id } });
  req.session.user = foundUser;

  res.redirect('http://localhost:5173');
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ where: { email } });

  if (!foundUser) return res.status(401).json({ message: 'e-mail не зарегистрирован' });
  if (!foundUser.confirmed) return res.status(401).json({ message: 'Пожалуйста подвердите свой e-mail' });

  if (await bcrypt.compare(password, foundUser.hashpass)) {
    req.session.user = foundUser;
    return res.json(foundUser);
  }

  return res.status(401).json({ message: 'Неверный пароль' });
});

authRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_id');
  res.sendStatus(200);
});

authRouter.get('/check', async (req, res) => {
  if (req.session?.user?.id) {
    return res.json(req.session.user);
  }
  return res.sendStatus(401);
});

module.exports = authRouter;
