import { prisma } from "../config/database";
import { NotesData, PrismaDeleteQuery } from "../types/notesTypes";

export async function create(notesData: NotesData) {
    const { title, text, userId } = notesData as {
        title: string;
        text: string;
        userId: number;
    };
    return await prisma.notes.create({
        data: {
            title,
            text,
            userId,
        },
    });
}

export async function findByIdAndUserId(
    id: number | undefined,
    userId: number
) {
    return await prisma.notes.findMany({
        where: {
            id,
            userId,
        },
    });
}

export async function deleteNote(
    id: number,
    userId: number
): Promise<PrismaDeleteQuery> {
    const note: any = await prisma.notes.deleteMany({
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

    return note;
}

export async function findByTitleAndUserId(title: string, userId: number) {
    return await prisma.notes.findFirst({
        where: {
            title,
            userId,
        },
    });
}
