import {Request, Response, Router} from 'express';
import jwt from "jsonwebtoken";

import {validateRequest} from "../../middlewares/validate-request";
import {BadRequestError} from "../../errors/bad-request-error";
import {pool} from "../../db/mysql/pool";
import {phoneNumberOrEmail} from "../../validators/phone-email";
import {password} from "../../validators/password";
import {checkQueryResult} from "../../util/heplers/check-query-result";
import {ResultSetHeader} from "mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader";

const router = Router();

router.post('/signup',
    [
        phoneNumberOrEmail('login'),
        password('password'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {login, password} = req.body;

        let [results] = await pool.query('select login from users where login=?', [login]);

        if (!checkQueryResult(results)) {
            throw new BadRequestError('Login in use');
        }

        const hashedPassword = await password.hash(password);
        [results] = await pool.query('insert into users (login, hashed_password) values (?, ?)', [login, hashedPassword]);
        const userId = (results as ResultSetHeader).insertId;

        const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN! });;
        const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET!);

        req.session = {
            accessToken, refreshToken
        };

        res.status(201).send({userId});
    });

export {router as signupRouter};