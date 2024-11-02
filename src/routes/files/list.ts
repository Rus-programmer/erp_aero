import {Request, Response, Router} from 'express';

import {requireAuth} from "../../middlewares/require-auth";
import {pool} from "../../db/mysql/pool";

const router = Router();

router.get('/file/list', requireAuth, async (req: Request, res: Response) => {
    const listSize = Number(req.query.list_size) || 10;
    const page = Number(req.query.page) || 1;

    const offset = (page - 1) * listSize;
    console.log('offset: ', offset)
    console.log('listSize: ', listSize)

    let [results] = await pool.query('select * from files limit ? offset ?', [listSize, offset]);

    res.status(200).send(results)
});

export {router as fileListRouter};