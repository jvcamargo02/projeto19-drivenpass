import * as sessionService from "../services/sessionsServices";
import * as notesRepository from "../repositories/notesRepositories";
import { NotesData } from "../types/notesTypes";

export async function create(
    notesData: NotesData,
    authorization: string | undefined
) {
    const { title, text } = notesData as { title: string; text: string };
    const userId = await sessionService.findSession(authorization);
    checkLength(title, text);
    await isValidData(title, userId);

    return await notesRepository.create({ title, text, userId });
}

export async function getById(
    id: number | undefined,
    authorization: string | undefined
) {
    const userId = await sessionService.findSession(authorization);
    const note = await notesRepository.findByIdAndUserId(id, userId);

    if (note.length === 0 && id)
        throw {
            type: "not_found",
            message: "Note(s) not found",
        };

    return note;
}

export async function deleteNotes(
    id: number,
    authorization: string | undefined
) {
    const userId = await sessionService.findSession(authorization);
    const deleteNote = await notesRepository.deleteNote(id, userId);

    if (deleteNote.count === 0)
        throw {
            type: "not_found",
            message: "Note(s) not found or invalid user",
        };

    return deleteNote;
}

function checkLength(title: string, text: string) {
    if (title.length > 50 || text.length > 1000)
        throw {
            type: "unprocessable_entity",
            message:
                "Title must be less than 50 characters and Text must be less than 1000 characters",
        };
}

async function isValidData(title: string, userId: number) {
    const hasNote = await notesRepository.findByTitleAndUserId(title, userId);

    if (hasNote)
        throw {
            type: "bad_request",
            message: "This note already exists, try another name",
        };

    return hasNote;
}
