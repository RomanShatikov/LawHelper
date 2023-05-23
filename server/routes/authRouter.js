const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  const hashpass = await bcrypt.hash(password, 10);

  const [foundUser, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      firstName,
      lastName,
      hashpass,
    },
  });

  if (!created) return res.status(401).json({ message: 'e-mail уже зарегистрирован' });

  req.session.user = foundUser;

  return res.json(foundUser);
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ where: { email } });

  if (!foundUser) return res.status(401).json({ message: 'e-mail не зарегистрирован' });

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
