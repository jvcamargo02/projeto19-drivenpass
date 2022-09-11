export interface Wifi {
    id: number;
    name: string;
    password: string;
    title: string;
    userId: number;
}

export type WifiData = Omit<Wifi, "id" | "userId">;
