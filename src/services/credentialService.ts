import * as sessionsService from "./sessionsServices";
import * as credentialRepository from "../repositories/credentialRepositories";
import { CredentialData } from "../types/credentialTypes";
import { decrypt, encrypt } from "../utils/encrypt";

export async function create(
    credentialData: CredentialData,
    authorization: string
) {
    const { password, title } = credentialData as {
        password: string;
        title: string;
    };
    const userId: number = await sessionsService.findSession(authorization);
    await findCredentialByTitle(userId, title);
    const encryptedPassword = encrypt(password);
    const data: CredentialData = {
        ...credentialData,
        password: encryptedPassword,
        userId,
    };
    return await credentialRepository.create(data);
}

export async function findById(
    id: number | undefined,
    authorization: string | undefined
) {
    const userId = await sessionsService.findSession(authorization);
    const credential = await credentialRepository.findByIdAndUserId(id, userId);

    if (credential.length === 0 && id)
        throw {
            type: "not_found",
            message: "Credential(s) not found",
        };

    return controllerResponseData(credential)
}

function controllerResponseData(credential: CredentialData[]) {
    const credentials: CredentialData[] = [];

    credential.map((data: any) => {
        const decryptPassword = decrypt(data.password);
        credentials.push({
            ...data,
            password: decryptPassword,
        });
    });

    return credentials
}

export async function deleteCredential(
    id: number,
    authorization: string | undefined
) {
    const userId = await sessionsService.findSession(authorization);
    const credential = await credentialRepository.deleteCredential(id, userId);

    if (credential.count === 0)
        throw {
            type: "not_found",
            message: "Credential not found or invalid user",
        };

    return credential
}
async function findCredentialByTitle(userId: number, title: string) {
    const hasCredential = await credentialRepository.findByTitleAndUserId(
        userId,
        title
    );

    if (hasCredential)
        throw {
            type: "bad_request",
            message: "This credential already exists, try another name",
        };

    return hasCredential;
}
