import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import * as functions from 'firebase-functions';
import { connect } from 'mongoose';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import { corsOptions } from './corsConfig';
import authActionsRoute from './routes/authActionsRoute';
import userRouter from './routes/userRoute';
dotenv.config();

const app = express();
const connectToDatabase = async () => {
  try {
    await connect(process.env.DB_URL!);
    console.log('DB connected');
  } catch (err) {
    console.error('Error connecting to DB:', err);
  }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/user', userRouter);
app.use('/', authActionsRoute);
app.use(errorHandler);

if (process.env.NODE_ENV === 'dev') {
  connectToDatabase();
  app.listen(process.env.MY_PORT, () => {
    console.log(`Server is running on PORT ${process.env.MY_PORT}`);
  });
}

export const api = functions.https.onRequest((connectToDatabase(), app));
