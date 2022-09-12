"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notesController_1 = require("../controllers/notesController");
const validateSchema_1 = require("../middlewares/validateSchema");
const notesSchemas_1 = require("../schemas/notesSchemas");
const notesRoute = (0, express_1.Router)();
notesRoute.post("/notes", (0, validateSchema_1.validateSchema)(notesSchemas_1.notesSchema), notesController_1.create);
notesRoute.get("/notes", notesController_1.getById);
notesRoute.delete("/notes/:id", notesController_1.deleteNotes);
exports.default = notesRoute;