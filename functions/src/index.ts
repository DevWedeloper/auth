import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import * as functions from 'firebase-functions';
import { corsOptions } from './cors-config';
import { errorHandler } from './middlewares/error-handler';
import authActionsRoute from './routes/auth-actions-route';
import userRouter from './routes/user-route';
dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use('/user', userRouter);
app.use('/', authActionsRoute);
app.use(errorHandler);

if (process.env.NODE_ENV === 'dev') {
  app.listen(process.env.MY_PORT, () => {
    console.log(`Server is running on PORT ${process.env.MY_PORT}`);
  });
}

export const api = functions.https.onRequest(app);
