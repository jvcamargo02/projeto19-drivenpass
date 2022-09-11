import { prisma } from "../config/database";

export async function newSession(userId: number) {
    const session = await prisma.sessions.create({
        data: {
            userId
        }
    })

    return session
}

export async function findById(id: number) {
    return await prisma.sessions.findFirst({
        where: { 
            id
        }
    })
}