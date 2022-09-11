import { Request, Response } from "express";
import * as cardServices from "../services/cardService";
import { CardData } from "../types/cardTypes";

export async function create(req: Request, res: Response) {
    const { authorization } = req.headers as {
        authorization: string | undefined;
    };
    const {
        number,
        holderName,
        securityCode,
        expirationDate,
        password,
        isVirtual,
        type,
        title,
    } = req.body as {
        number: string;
        holderName: string;
        securityCode: string;
        expirationDate: string;
        password: string;
        isVirtual: boolean;
        type: any;
        title: string;
    };
    const bodyData = {
        number,
        holderName,
        securityCode,
        expirationDate,
        password,
        isVirtual,
        type,
        title,
    };
    await cardServices.create(bodyData, authorization);

    res.sendStatus(201);
}

export async function getCard(req: Request, res: Response) {
    const { authorization } = req.headers as {
        authorization: string | undefined;
    };
    const id = Number(req.query.id) || undefined;
    const card = await cardServices.getById(id, authorization);

    res.status(200).send(card);
}

export async function deleteCard(req: Request, res: Response) {
    const { authorization } = req.headers as {
        authorization: string | undefined;
    };
    const id = Number(req.params.id)

    await cardServices.deleteCard(id, authorization)

    res.sendStatus(200)
    
}
