import express, { Express, NextFunction, Request, Response } from 'express';
import path from 'path';

// Import useful dependencies
import createError from 'http-errors'
import logger from 'morgan'

import shortenerRouter from './routes/shortener';
import userRouter from './routes/user';

import cors from "cors";
import bodyParser from "body-parser";

// Import redis
import redisClient from './utils/redisClient';

import {PORT, FRONTEND_URL} from "./utils/env";
import DDlogger from './utils/datadog';



// Main App
const app: Express = express();
const port = PORT;


// Enabling frontend requests
const corsOptions = {
  origin: [FRONTEND_URL],
  credentials: true,
};
app.use(cors(corsOptions));

// parst request body
app.use(bodyParser.json());

// Useful middlewares
app.use(logger('dev'))

// Parse HTTP requests with JSON or URL-encoded payloads.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load static files
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');

// Load client files
app.use(express.static(path.join(__dirname, '../client/build')));

// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log error to datadog
  DDlogger.log('error', err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(500);
  res.render("error");
});

// Routes
app.use('/', shortenerRouter);
app.use('/', userRouter);

app.get('/_ah/warmup', (_req, res) => {
  // Handle your warmup logic. Initiate db connection, etc.
  res.status(200).send();
});

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'), { root: path.resolve(__dirname, '..'), lastModified: false, etag: false });
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});