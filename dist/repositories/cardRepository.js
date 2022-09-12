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
exports.findByTitleAndUserId = exports.deleteCard = exports.findByIdAndUserId = exports.create = void 0;
const database_1 = require("../config/database");
function create(cardData, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { number, holderName, securityCode, expirationDate, password, isVirtual, type, title, } = cardData;
        return yield database_1.prisma.cards.create({
            data: {
                number,
                holderName,
                securityCode,
                expirationDate,
                password,
                isVirtual,
                title,
                type,
                userId
            },
        });
    });
}
exports.create = create;
function findByIdAndUserId(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.cards.findMany({
            where: {
                id,
                userId,
            },
        });
    });
}
exports.findByIdAndUserId = findByIdAndUserId;
function deleteCard(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield database_1.prisma.cards.deleteMany({
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
        return card;
    });
}
exports.deleteCard = deleteCard;
function findByTitleAndUserId(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.cards.findFirst({
            where: {
                title,
                userId,
            },
        });
    });
}
exports.findByTitleAndUserId = findByTitleAndUserId;
