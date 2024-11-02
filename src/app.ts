import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import dotenv from 'dotenv'

import {NotFoundError} from "./errors/not-found-error";
import {errorHandler} from "./middlewares/error-handler";
import {signupRouter} from "./routes/auth/signup";
import {signinRouter} from "./routes/auth/signin";
import {newTokenRouter} from "./routes/auth/new-token";
import {currentUser} from "./middlewares/current-user";
import {logoutRouter} from "./routes/auth/logout";
import {infoRouter} from "./routes/info/info";
import {fileUploadRouter} from "./routes/files/upload";
import {fileListRouter} from "./routes/files/list";
import {fileDeleteRouter} from "./routes/files/delete";
import {getFileByIdRouter} from "./routes/files/getById";
import {fileDownloadRouter} from "./routes/files/download";
import {fileUpdateRouter} from "./routes/files/update";

dotenv.config();
const app = express();
app.use(cors())
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secret: process.env.SESSION_SECRET
    })
);

app.use(currentUser);

app.use(signupRouter);
app.use(signinRouter);
app.use(newTokenRouter);
app.use(logoutRouter);

app.use(infoRouter);

app.use(fileUploadRouter);
app.use(getFileByIdRouter);
app.use(fileListRouter);
app.use(fileDeleteRouter);
app.use(fileDownloadRouter);
app.use(fileUpdateRouter);

app.all('*', async () => {
    throw new NotFoundError('Route not found');
});

app.use(errorHandler);

export { app };
