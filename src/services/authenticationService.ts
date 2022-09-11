import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authenticationRepository from "../repositories/authenticationRepository";
import * as sessionRepository from "../repositories/sessionRepositories";
import { Auth, User } from "../types/authenticationTypes";
import { Session } from "../types/sessionType";

export async function signUp(signUp: Auth) {
    const { email, password } = signUp;

    passwordCheck(password);
    await isUniqueEmail(email);
    const hashedPassword = await hashPassword(password);

    return await authenticationRepository.create({
        email,
        password: hashedPassword,
    });
}

export async function signIn(signIn: Auth) {
    const { email, password } = signIn;

    const user: any = await isValidEmail(email);
    await isValidPassword(password, user.password);
    const session: any = await sessionRepository.newSession(user.id);
    const token = generateToken(session.id);

    return token
}

function generateToken (sessionId: number) {
    const SECRET: any = process.env.JWT_SECRET;
    return jwt.sign({ sessionId }, SECRET, {
        expiresIn: "30d",
    });
};

async function isUniqueEmail(email: string) {
    const user = await checkEmail(email);

    if (user)
        throw { type: "unauthorized", message: "E-mail already registered" };
}

async function isValidEmail(email: string) {
    const user: User = await checkEmail(email);

    if (!user)
        throw { type: "not_found", message: "Incorrect email or password" };

    return user;
}

async function checkEmail(email: string) {
    const user: User = await authenticationRepository.findByEmail(email);

    return user;
}

function passwordCheck(password: string) {
    if (password.length < 10) {
        throw {
            type: "unprocessable_entity",
            message: "Password must be have 10 characters",
        };
    }
}

async function hashPassword(data: string) {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(data, salt);
}

async function isValidPassword(password: string, hashedPassword: string) {
    const verify = bcrypt.compareSync(password, hashedPassword);

    if (!verify)
        throw { type: "unathorized", message: "Incorrect email or password" };
}
