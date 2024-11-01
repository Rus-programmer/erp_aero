import {body, oneOf} from "express-validator";

export const phoneNumberOrEmail = (field: string) => {
    return oneOf([
        body(field).isEmail(),
        body(field).isMobilePhone('any'),
    ], {message: 'Login must be a phone number or email'})
}