import express from 'express';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import morgan from './utils/logger.js';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import { fileURLToPath } from 'url';

const app = express();
const __filename=fileURLToPath(import.meta.url)
const __dirname =dirname(__filename)
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
