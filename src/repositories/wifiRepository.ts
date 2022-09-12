import { prisma } from "../config/database";
import { PrismaDeleteQuery } from "../types/notesTypes";
import { WifiData } from "../types/wifiTypes";

export async function create(wifiData: WifiData, userId: number) {
    const { name, password, title } = wifiData;

    return await prisma.wifi.create({
        data: {
            name,
            password,
            title,
            userId
        },
    });
}

export async function findByIdAndUserId(id: number | undefined, userId: number) {
    return await prisma.wifi.findMany({
        where: {
            id,
            userId
        }
    })
}

export async function deleteWifi(id: number, userId: number): Promise<PrismaDeleteQuery> {
    const wifi: any = await prisma.wifi.deleteMany({
        where: {
            AND: [
                {
                    id,
                },
                {
                    userId,
                },
            ],
        }
    })

    return wifi
}
