import { Request, Response } from "express";
import * as notesServices from "../services/notesServices";
import { PrismaDeleteQuery } from "../types/notesTypes";

export async function create(req: Request, res: Response) {
    const { authorization } = req.headers as {
        authorization: string | undefined;
    };
    const { title, text } = req.body as { title: string; text: string };

    await notesServices.create({ title, text }, authorization);

    res.sendStatus(201);
}

export async function getById(req: Request, res: Response) {
    const { authorization } = req.headers as {
        authorization: string | undefined;
    };
    const id = Number(req.query.id) || undefined;
    const note = await notesServices.getById(id, authorization);

    res.status(200).send(note)
}

export async function deleteNotes(req: Request, res: Response) {
    const { authorization } = req.headers as {
        authorization: string | undefined;
    };
    const id = Number(req.params.id)
    
    await notesServices.deleteNotes(id, authorization)

    res.sendStatus(200)
}