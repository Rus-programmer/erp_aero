import {Request, Response, Router} from 'express';

import {requireAuth} from "../../middlewares/require-auth";
import {pool} from "../../db/mysql/pool";
import {isQueryResultEmpty} from "../../utils/check-query-result";
import {BadRequestError} from "../../errors/bad-request-error";
import {File} from "../../types/file";

const router = Router();

router.get('/file/:id', requireAuth, async (req: Request, res: Response) => {
    const fileId = req.params.id;

    let [results] = await pool.query('select * from files where id = ?', [fileId]);
    if (isQueryResultEmpty(results)) {
        throw new BadRequestError('File not found');
    }
    const file = results as File[];

    res.status(200).send(file[0])
});

export {router as getFileByIdRouter};