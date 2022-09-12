"use strict";
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
exports.findByTitleAndUserId = exports.deleteNote = exports.findByIdAndUserId = exports.create = void 0;
const database_1 = require("../config/database");
function create(notesData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, text, userId } = notesData;
        return yield database_1.prisma.notes.create({
            data: {
                title,
                text,
                userId,
            },
        });
    });
}
exports.create = create;
function findByIdAndUserId(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.notes.findMany({
            where: {
                id,
                userId,
            },
        });
    });
}
exports.findByIdAndUserId = findByIdAndUserId;
function deleteNote(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = yield database_1.prisma.notes.deleteMany({
            where: {
                AND: [
                    {
                        id,
                    },
                    {
                        userId,
                    },
                ],
            },
        });
        return note;
    });
}
exports.deleteNote = deleteNote;
function findByTitleAndUserId(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.notes.findFirst({
            where: {
                title,
                userId,
            },
        });
    });
}
exports.findByTitleAndUserId = findByTitleAndUserId;
