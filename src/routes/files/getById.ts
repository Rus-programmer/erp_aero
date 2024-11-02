import {Request, Response, Router} from 'express';

import {requireAuth} from "../../middlewares/require-auth";
import {pool} from "../../db/mysql/pool";

const router = Router();

router.get('/file/:id', requireAuth, async (req: Request, res: Response) => {
    const fileId = req.params.id;

    let [results] = await pool.query('select * from files where id = ?', [fileId]);

    res.status(200).send(results)
});

export {router as getFileByIdRouter};