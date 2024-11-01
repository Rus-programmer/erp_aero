import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv'

import {NotFoundError} from "./errors/not-found-error";
import {errorHandler} from "./middlewares/error-handler";
import {signupRouter} from "./routes/auth/signup";
import {signinRouter} from "./routes/auth/signin";
import {newTokenRouter} from "./routes/auth/new-token";

dotenv.config();
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secret: process.env.SESSION_SECRET
    })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(newTokenRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
