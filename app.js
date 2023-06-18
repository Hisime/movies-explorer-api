const helmet = require('helmet');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimiter = require('./utils/rate-limiter');
const router = require('./routes');
const errorsHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const { DB_ADDRESS = 'mongodb://0.0.0.0:27017/bitfilmsdb', PORT = 3000 } = process.env;

const app = express();
app.use(cors({
  credentials: true,
  origin: [
    'https://praktikum.tk',
    'http://praktikum.tk',
    'https://hisime.movies.nomoredomains.rocks',
    'http://hisime.movies.nomoredomains.rocks',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
}));
app.use(helmet());
mongoose.connect(DB_ADDRESS);
app.use(requestLogger);
app.use(rateLimiter);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
app.listen(PORT, () => console.log('server started'));
