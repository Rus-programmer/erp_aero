import {Request, Response, Router} from 'express';
import {requireAuth} from "../../middlewares/require-auth";

const router = Router();

router.get('/info', requireAuth, async (req: Request, res: Response) => {
    res.status(200).send({userId: req.currentUser?.id});
});

export {router as infoRouter};