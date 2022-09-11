import { Router } from "express";
import { create, deleteNotes, getById } from "../controllers/notesController";
import { validateSchema } from "../middlewares/validateSchema";
import { notesSchema } from "../schemas/notesSchemas";

const notesRoute = Router();

notesRoute.post("/notes", validateSchema(notesSchema), create);
notesRoute.get("/notes", getById)
notesRoute.delete("/notes/:id", deleteNotes )

export default notesRoute