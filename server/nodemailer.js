const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const { User } = require('./db/models');

function sendEmail(user, code) {
  const mailOptions = {
    from: 'lawhelper@bk.ru',
    to: user.email,
    subject: 'Код подтверждения',
    html: `<p>Перейди по ссылке для завершения регистрации: 
    <br /><strong>http://localhost:5173/login/forget/${code}</strong></p>`,
  };

  const transporter = nodemailer.createTransport({
    host: 'smtp.bk.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'lawhelper@bk.ru',
      pass: 'trxkttvltfjgjhzi2',
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sended', info);
    }
  });
}

module.exports = sendEmail;
