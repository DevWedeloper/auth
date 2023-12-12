import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import * as functions from 'firebase-functions';
import { connect } from 'mongoose';
// import cron from 'node-cron';
dotenv.config();

// import { refreshTokenCleanup } from './cron/refreshTokenCleanup';
import loginRoute from './routes/loginRoute';
import userRouter from './routes/userRoute';

const app: Application = express();

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN,
  process.env.ALLOWED_ORIGIN_VERCEL,
];
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (arg0: Error | null, arg1: boolean | undefined) => void
  ) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
};

app.use(cors(corsOptions));

const connectToDatabase = async () => {
  try {
    await connect(process.env.DB_URL!);
    console.log('DB connected');
  } catch (err) {
    console.error('Error connecting to DB:', err);
  }
};

// connectToDatabase();
app.use(express.json());

app.use('/user', userRouter);
app.use('/', loginRoute);

// app.listen(process.env.MY_PORT, () => {
//   console.log(`Server is running on PORT ${process.env.MY_PORT}`);
// });
// cron.schedule('0 0 * * *', refreshTokenCleanup);

export const api = functions.https.onRequest((connectToDatabase(), app));
