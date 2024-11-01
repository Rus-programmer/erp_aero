import bcrypt from 'bcrypt';

export const hashPassword = async function (password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
}

export const checkPassword = async function (password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
}