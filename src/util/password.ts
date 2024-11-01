import bcrypt from 'bcrypt';

module.exports.hashPassword = async function (password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
}

module.exports.checkPassword = async function (password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
}