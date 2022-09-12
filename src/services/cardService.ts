import * as sessionsServices from "../services/sessionsServices";
import * as cardRepository from "../repositories/cardRepository";
import { CardData } from "../types/cardTypes";
import { decrypt, encrypt } from "../utils/encrypt";

export async function create(
    body: CardData,
    authorization: string | undefined
) {
    const userId = await sessionsServices.findSession(authorization);
    await isValidTitle(body.title, userId);
    const encryptedPassword = encrypt(body.password);
    const encryptedCvv = encrypt(body.securityCode);
    const data = {
        ...body,
        password: encryptedPassword,
        securityCode: encryptedCvv,
    };

    return await cardRepository.create(data, userId);
}

export async function getById(
    id: number | undefined,
    authorization: string | undefined
) {
    const userId = await sessionsServices.findSession(authorization);
    const card: CardData[] = await cardRepository.findByIdAndUserId(id, userId);


    if (card.length === 0 && id)
        throw {
            type: "not_found",
            message: "Card(s) not found",
        };

    return cardReponseData(card);
}

export async function deleteCard(
    id: number,
    authorization: string | undefined
) {
    const userId = await sessionsServices.findSession(authorization);
    const deletedCard = await cardRepository.deleteCard(id, userId);

    if (deletedCard.count === 0)
        throw {
            type: "not_found",
            message: "Card(s) not found or invalid user",
        };

    return deletedCard;
}

async function isValidTitle(title: string, userId: number) {
    const hasCard = await cardRepository.findByTitleAndUserId(title, userId);

    if (hasCard)
        throw {
            type: "bad_request",
            message: "This Card already exists, try another name",
        };

    return hasCard;
}


function cardReponseData(card: CardData[]) {
    const response: CardData[] = []

    card.map((data: any) => {
        const decryptPassword = decrypt(data.password)
        const decryptCvv = decrypt(data.securityCode)

        response.push({
            ...data,
            password: decryptPassword,
            securityCode: decryptCvv
        })
    })
    return response
}