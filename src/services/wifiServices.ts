import * as sessionsServices from "../services/sessionsServices";
import * as wifiRepository from "../repositories/wifiRepository";
import { WifiData } from "../types/wifiTypes";
import { decrypt, encrypt } from "../utils/encrypt";

export async function create(
    wifiData: WifiData,
    authorization: string | undefined
) {
    const userId = await sessionsServices.findSession(authorization);
    const encryptedPassword = encrypt(wifiData.password);
    const data = {
        ...wifiData,
        password: encryptedPassword,
    };

    return await wifiRepository.create(data, userId);
}

export async function getById(
    id: number | undefined,
    authorization: string | undefined
) {
    const userId = await sessionsServices.findSession(authorization);
    const wifi: WifiData[] = await wifiRepository.findByIdAndUserId(id, userId);

    if (wifi.length === 0 && id)
        throw {
            type: "not_found",
            message: "Wifi(s) not found",
        };

    return wifiResponseData(wifi);
}

export async function deleteWifi(
    id: number,
    authorization: string | undefined
) {
    const userId = await sessionsServices.findSession(authorization);
    const deletedWifi = await wifiRepository.deleteWifi(id, userId);

    if (deletedWifi.count === 0)
        throw {
            type: "not_found",
            message: "Card(s) not found or invalid user",
        };
    
    return deletedWifi
}

function wifiResponseData(wifi: WifiData[]) {
    const response: WifiData[] = [];

    wifi.map((data: any) => {
        const decryptPassword = decrypt(data.password);

        response.push({
            ...data,
            password: decryptPassword,
        });
    });

    return response;
}
