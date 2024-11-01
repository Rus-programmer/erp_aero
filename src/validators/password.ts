import {body} from "express-validator";

export const password = (field: string) => {
    return body(field)
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 characters')
}