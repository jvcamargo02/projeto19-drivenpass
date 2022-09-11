import { Request, Response } from "express"
import * as authenticationService from "../services/authenticationService"
import { Auth } from "../types/authenticationTypes"

export async function signup(req: Request, res: Response) {
    const { email, password } = req.body as { email: string, password: string}
    const signUpData: Auth = {
        email,
        password
    }

    await authenticationService.signUp(signUpData)

    res.sendStatus(201)
}

export async function signin(req: Request, res: Response) {
    const { email, password } = req.body as { email: string, password: string }
    const userData: Auth = {
        email,
        password
    }

    const token = await authenticationService.signIn(userData)

    res.status(200).send(token)

}