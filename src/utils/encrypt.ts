import Cryptr from "cryptr";

export function encrypt(data: string) {
    const SECRET: any = process.env.JWT_SECRET;
    const cryptr = new Cryptr(SECRET);

    return cryptr.encrypt(data);
}

export function decrypt(data: string) {
    const SECRET: any = process.env.JWT_SECRET;
    const cryptr = new Cryptr(SECRET);

    return cryptr.decrypt(data)
}

