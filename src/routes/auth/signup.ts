import {Request, Response, Router} from 'express';
import {RowDataPacket} from "mysql2/typings/mysql/lib/protocol/packets/RowDataPacket";

import {validateRequest} from "../../middlewares/validate-request";
import {BadRequestError} from "../../errors/bad-request-error";
import {pool} from "../../db/mysql/pool";
import {phoneNumberOrEmail} from "../../validators/phone-email";
import {password} from "../../validators/password";
import {isQueryResultEmpty} from "../../utils/check-query-result";
import {hashPassword} from "../../utils/password";
import {generateAccessToken, generateRefreshToken} from "../../utils/tokenGenerator";

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

        if (!isQueryResultEmpty(results)) {
            throw new BadRequestError('Login in use');
        }

        const hashedPassword = await hashPassword(password);
        [results] = await pool.query('insert into users (login, hashed_password) values (?, ?)', [login, hashedPassword]);
        const userId = (results as RowDataPacket).insertId;

        const accessToken = generateAccessToken(userId);
        const refreshToken = generateRefreshToken(userId);

        req.session = {
            accessToken, refreshToken
        };

        res.status(201).send({userId});
    });

export {router as signupRouter};