import jwt, {SignOptions} from "jsonwebtoken";

const tokenGenerator = (userId: string, secretKey: string, opts?: SignOptions) => {
    return jwt.sign({ id: userId }, secretKey, opts);
}

export const generateAccessToken = (userId: string, opts?: SignOptions) => {
    return tokenGenerator(userId, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN!, ...opts });
}

export const generateRefreshToken = (userId: string, opts?: SignOptions) => {
    return tokenGenerator(userId, process.env.REFRESH_TOKEN_SECRET!, {...opts});
}
