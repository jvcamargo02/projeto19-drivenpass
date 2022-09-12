"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotes = exports.getById = exports.create = void 0;
const sessionService = __importStar(require("../services/sessionsServices"));
const notesRepository = __importStar(require("../repositories/notesRepositories"));
function create(notesData, authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, text } = notesData;
        const userId = yield sessionService.findSession(authorization);
        checkLength(title, text);
        yield isValidData(title, userId);
        return yield notesRepository.create({ title, text, userId });
    });
}
exports.create = create;
function getById(id, authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield sessionService.findSession(authorization);
        const note = yield notesRepository.findByIdAndUserId(id, userId);
        if (note.length === 0 && id)
            throw {
                type: "not_found",
                message: "Note(s) not found",
            };
        return note;
    });
}
exports.getById = getById;
function deleteNotes(id, authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield sessionService.findSession(authorization);
        const deleteNote = yield notesRepository.deleteNote(id, userId);
        if (deleteNote.count === 0)
            throw {
                type: "not_found",
                message: "Note(s) not found or invalid user",
            };
        return deleteNote;
    });
}
exports.deleteNotes = deleteNotes;
function checkLength(title, text) {
    if (title.length > 50 || text.length > 1000)
        throw {
            type: "unprocessable_entity",
            message: "Title must be less than 50 characters and Text must be less than 1000 characters",
        };
}
function isValidData(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const hasNote = yield notesRepository.findByTitleAndUserId(title, userId);
        if (hasNote)
            throw {
                type: "bad_request",
                message: "This note already exists, try another name",
            };
        return hasNote;
    });
}
