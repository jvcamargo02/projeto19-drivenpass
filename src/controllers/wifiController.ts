import { Request, Response } from "express";
import * as wifiServices from "../services/wifiServices";

export async function create(req: Request, res: Response) {
    const { authorization } = req.headers as {
        authorization: string | undefined;
    };
    const { name, password, title } = req.body as {
        name: string;
        password: string;
        title: string;
    };
    const data = {
        name,
        password,
        title,
    };

    await wifiServices.create(data, authorization);

    res.sendStatus(201);
}

export async function getWifi(req: Request, res: Response) {
    const { authorization } = req.headers as {
        authorization: string | undefined;
    };
    const id = Number(req.query.id) || undefined;
    const wifi = await wifiServices.getById(id, authorization);

    res.status(200).send(wifi);
}

export async function deleteWifi(req: Request, res: Response) {
    const { authorization } = req.headers as {
        authorization: string | undefined;
    };
    const id = Number(req.params.id);

    await wifiServices.deleteWifi(id, authorization)

    res.sendStatus(200)
}
