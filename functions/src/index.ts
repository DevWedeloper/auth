import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import * as functions from 'firebase-functions';
import { connect } from 'mongoose';
import { corsOptions } from './corsConfig';
import loginRoute from './routes/loginRoute';
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

// connectToDatabase();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/user', userRouter);
app.use('/', loginRoute);

// app.listen(process.env.MY_PORT, () => {
//   console.log(`Server is running on PORT ${process.env.MY_PORT}`);
// });

export const api = functions.https.onRequest((connectToDatabase(), app));
