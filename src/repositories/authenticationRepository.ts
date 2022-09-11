import { prisma } from "../config/database";
import { Auth, User } from "../types/authenticationTypes";

export async function create(signUp: Auth) {
    await prisma.users.create({
        data: signUp
    });
}

export async function findByEmail(email:string): Promise<any> {
    return await prisma.users.findFirst({
        where: {
            email
        }
    })
}