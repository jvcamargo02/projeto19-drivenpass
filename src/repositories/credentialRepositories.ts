import { prisma } from "../config/database";
import { CredentialData } from "../types/credentialTypes";
import { PrismaDeleteQuery } from "../types/notesTypes";

export async function create(credentialData: CredentialData) {
    const { url, username, password, title, userId } = credentialData as {
        url: string;
        username: string;
        password: string;
        title: string;
        userId: number;
    };
    return await prisma.credentials.create({
        data: {
            url,
            username,
            password,
            title,
            userId,
        },
    });
}

export async function findByIdAndUserId(
    id: number | undefined,
    userId: number
) {
    return await prisma.credentials.findMany({
        where: {
            id,
            userId,
        },
    });
}

export async function deleteCredential(
    id: number,
    userId: number
): Promise<PrismaDeleteQuery> {
    const credential: any = await prisma.credentials.deleteMany({
        where: {
            AND: [
                {
                    id,
                },
                {
                    userId,
                },
            ],
        },
    });
    return credential;
}

export async function findByTitleAndUserId(userId: number, title: string) {
    return await prisma.credentials.findFirst({
        where: {
            userId,
            title,
        },
    });
}
