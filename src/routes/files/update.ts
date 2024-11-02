import {Request, Response, Router} from 'express';
import fs from "fs";
import mime from "mime-types";

import {requireAuth} from "../../middlewares/require-auth";
import {upload} from "../../multer/config";
import {pool} from "../../db/mysql/pool";
import {BadRequestError} from "../../errors/bad-request-error";
import {isQueryResultEmpty} from "../../utils/check-query-result";
import {File} from "../../types/file";

const router = Router();

router.put('/file/update/:id', requireAuth, upload.single('file'), async (req: Request, res: Response) => {
    const file = req.file;
    const fileId = req.params.id;

    if (!file) {
        throw new BadRequestError('File must be provided');
    }

    const [results] = await pool.query('select * from files where id = ?', [fileId]);
    if (isQueryResultEmpty(results)) {
        throw new BadRequestError('File not found');
    }
    const fileResult = results as File[];
    fs.unlinkSync('uploads/' + fileResult[0].filename)

    const extension = mime.extension(file.mimetype)
    const query = 'update files set filename = ?, extension = ?, mimetype = ?, size = ? where id = ?'
    await pool.query(query, [file.filename, extension, file.mimetype, file.size, fileId]);

    res.sendStatus(200);
});

export {router as fileUpdateRouter};