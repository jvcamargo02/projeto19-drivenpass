export interface Card {
    id: number,
    number: string,
    holderName: string,
    securityCode: string,
    expirationDate: string,
    password: string,
    isVirtual: boolean,
    type: any,
    title: string,
    userId: number
}

export type CardData = Omit<Card, "id" | "userId" >