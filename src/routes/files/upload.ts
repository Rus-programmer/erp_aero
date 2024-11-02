import {Request, Response, Router} from 'express';

import {requireAuth} from "../../middlewares/require-auth";
import {upload} from "../../multer/config";
import {pool} from "../../db/mysql/pool";
import {BadRequestError} from "../../errors/bad-request-error";
import mime from "mime-types";
import {RowDataPacket} from "mysql2/typings/mysql/lib/protocol/packets/RowDataPacket";

const router = Router();

router.post('/file/upload', requireAuth, upload.single('file'), async (req: Request, res: Response) => {
    const file = req.file;

    if (!file) {
        throw new BadRequestError('File must be provided');
    }

    const extension = mime.extension(file.mimetype)
    const query = 'insert into files (filename, extension, mimetype, size) values (?, ?, ?, ?)'
    let [results] = await pool.query(query, [file.filename, extension, file.mimetype, file.size]);
    const fileId = (results as RowDataPacket).insertId;

    res.status(201).send({fileId})
});

export {router as fileUploadRouter};