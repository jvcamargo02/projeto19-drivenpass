import jwt from "jsonwebtoken";
import * as sessionRepository from "../repositories/sessionRepositories";
import { User } from "../types/authenticationTypes";

export async function findSession(authorization: string | undefined): Promise<number> {
    if (!authorization)
        throw { type: "unauthorized", message: "Token expired or invalid" };

    const token = authorization?.replace("Bearer ", "");
    const SECRET: any = process.env.JWT_SECRET;

    try {
            const { sessionId } = jwt.verify(token, SECRET) as { sessionId: any };
    const { userId } = (await sessionRepository.findById(sessionId)) as {
        userId: number;
    };

    return userId;
    } catch (e) {
        console.log(e)

        throw { type: "unauthorized", message: "Token expired or invalid"}
    }

}
