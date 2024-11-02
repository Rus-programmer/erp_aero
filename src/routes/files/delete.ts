import {Request, Response, Router} from 'express';
import fs from 'fs';

import {requireAuth} from "../../middlewares/require-auth";
import {pool} from "../../db/mysql/pool";
import {isQueryResultEmpty} from "../../utils/check-query-result";
import {BadRequestError} from "../../errors/bad-request-error";
import {File} from "../../types/file";

const router = Router();

router.get('/file/delete/:id', requireAuth, async (req: Request, res: Response) => {
    const fileId = req.params.id;

    const [results] = await pool.query('select * from files where id = ?', [fileId]);
    if (isQueryResultEmpty(results)) {
        throw new BadRequestError('File not found');
    }
    const file = results as File[];
    await pool.query('delete from files where id = ?', [fileId]);
    fs.unlinkSync('uploads/' + file[0].filename)

    res.sendStatus(200)
});

export {router as fileDeleteRouter};