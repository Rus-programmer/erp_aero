import {Request, Response, Router} from 'express';

import {requireAuth} from "../../middlewares/require-auth";
import {fileDestination} from "../../multer/config";
import {pool} from "../../db/mysql/pool";
import {BadRequestError} from "../../errors/bad-request-error";
import {isQueryResultEmpty} from "../../utils/check-query-result";
import {File} from "../../types/file";

const router = Router();

router.get('/file/download/:id', requireAuth, async (req: Request, res: Response) => {
    const fileId = req.params.id;

    const [results] = await pool.query('select * from files where id = ?', [fileId]);
    if (isQueryResultEmpty(results)) {
        throw new BadRequestError('File not found');
    }
    const file = results as File[];

    res.status(200).download(fileDestination + file[0].filename)
});

export {router as fileDownloadRouter};