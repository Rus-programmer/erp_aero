import multer from 'multer';
import mime from "mime-types";

export const fileDestination = 'uploads/';

const storage = multer.diskStorage({
    destination: fileDestination,
    filename: (req, file, cb) => {
        const extension = mime.extension(file.mimetype)
        const key = `${Date.now()}-${req.currentUser?.id}`
        const nameFile = key + "." + extension;
        cb(null, nameFile)
    }
})

const upload = multer({ storage })

export {upload}