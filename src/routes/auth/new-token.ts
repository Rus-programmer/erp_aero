import {Request, Response, Router} from 'express';
import jwt from "jsonwebtoken";

import {generateAccessToken} from "../../util/heplers/tokenGenerator";
import {UserPayload} from "../../types/user";

const router = Router();

router.post('/signin/new_token', async (req: Request, res: Response) => {
    const refreshToken = req.session?.refreshToken;
    let payload;
    try {
        payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as UserPayload;
    } catch (e) {
        throw new Error('Refresh token is not valid');
    }

    const accessToken = generateAccessToken(payload.id);

    req.session = {
        accessToken, refreshToken
    };

    res.status(200);
});

export {router as newTokenRouter};