import {Request, Response, Router} from 'express';

import {requireAuth} from "../../middlewares/require-auth";

const router = Router();

router.get('/logout', requireAuth, async (req: Request, res: Response) => {
    req.session = null;

    res.sendStatus(200);
});

export {router as logoutRouter};