import { Request, Response } from "express";
import * as credentialService from "../services/credentialService";
import { CredentialData } from "../types/credentialTypes";

export async function create(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string}
    const { url, username, password, title } = req.body as {
        url: string;
        username: string;
        password: string;
        title: string;
    };
    const credentialData: CredentialData = {
        url,
        username,
        password,
        title,
    };

    await credentialService.create(credentialData, authorization);

    res.sendStatus(201);
}

export async function deleteCredential(req: Request, res: Response) {
    const { authorization } = req.headers
    const id = Number(req.params.id)

    await credentialService.deleteCredential(id, authorization)

    res.sendStatus(200)
}

export async function findById(req: Request, res: Response) {
    const { authorization } = req.headers
    const id = Number(req.query.id) || undefined
    const credential = await credentialService.findById(id, authorization)

    res.status(200).send(credential)
}