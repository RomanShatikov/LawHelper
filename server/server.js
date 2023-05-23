const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const store = require('session-file-store');
const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');
const adminRouter = require('./routes/adminRouter');
const crudRouter = require('./routes/crudRouter');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const FileStore = store(session);

const sessionConfig = {
  name: 'user_id',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));
app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', indexRouter);
app.use('/api/crud', crudRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
