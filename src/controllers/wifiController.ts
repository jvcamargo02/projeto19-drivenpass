import { Request, Response } from "express";

export async function create(req: Request, res: Response) {
    const { authorization } = req.headers as {
        authorization: string | undefined;
    };
    const { name, password, title } = req.body as { 
        name: string,
        password: string,
        title: string
    }

    await 

    res.sendStatus(201)
}
