export interface Notes {
    id: string,
    title: string,
    text: string, 
    userId: number
}

export interface PrismaDeleteQuery {
    count: number
}

export type NotesData = Partial<Notes>