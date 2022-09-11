export interface Credential {
    id: number,
    url: string,
    username: string,
    password: string,
    title: string,
    userId: number,
    createdAt: string
}

export type CredentialData = Partial<Credential>