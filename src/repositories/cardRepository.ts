import { prisma } from "../config/database";
import { CardData } from "../types/cardTypes";
import { PrismaDeleteQuery } from "../types/notesTypes";

export async function create(cardData: CardData, userId: number) {
    const {
        number,
        holderName,
        securityCode,
        expirationDate,
        password,
        isVirtual,
        type,
        title,
    } = cardData;
    return await prisma.cards.create({
        data: {
            number,
            holderName,
            securityCode,
            expirationDate,
            password,
            isVirtual,
            title,
            type,
            userId
        },
    });
}

export async function findByIdAndUserId(
    id: number | undefined,
    userId: number
) {
    return await prisma.cards.findMany({
        where: {
            id,
            userId,
        },
    });
}

export async function deleteCard(
    id: number,
    userId: number
): Promise<PrismaDeleteQuery> {
    const card: any = await prisma.cards.deleteMany({
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
    return card
}

export async function findByTitleAndUserId(title: string, userId: number) {
    return await prisma.cards.findFirst({
        where: {
            title,
            userId,
        },
    });
}
