import {Request, Response, Router} from 'express';

import {validateRequest} from "../../middlewares/validate-request";
import {phoneNumberOrEmail} from "../../validators/phone-email";
import {password} from "../../validators/password";
import {BadRequestError} from "../../errors/bad-request-error";
import {pool} from "../../db/mysql/pool";
import {isQueryResultEmpty} from "../../utils/check-query-result";
import {checkPassword} from '../../utils/password'
import {User} from "../../types/user";
import {RowDataPacket} from "mysql2/typings/mysql/lib/protocol/packets/RowDataPacket";
import {generateAccessToken, generateRefreshToken} from "../../utils/tokenGenerator";
import {UserDTO} from "../../dtos/user";

const router = Router();

router.post('/signin', [phoneNumberOrEmail('login'), password('password')], validateRequest,
    async (req: Request, res: Response) => {
        const { login, password } = req.body;

        let [results] = await pool.query('select * from users where login=?', [login]);
        if (isQueryResultEmpty(results)) {
            throw new BadRequestError('Invalid credentialsI');
        }

        const existingUser = (results as RowDataPacket[])[0] as User;

        const passwordsMatch = await checkPassword(password, existingUser.hashed_password);
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid Credentials');
        }

        const accessToken = generateAccessToken(existingUser.id);
        const refreshToken = generateRefreshToken(existingUser.id);

        req.session = {
            accessToken, refreshToken
        };

        res.status(200).send(new UserDTO(existingUser));
    });

export {router as signinRouter};