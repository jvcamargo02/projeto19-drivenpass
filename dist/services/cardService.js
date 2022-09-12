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
exports.deleteCard = exports.getById = exports.create = void 0;
const sessionsServices = __importStar(require("../services/sessionsServices"));
const cardRepository = __importStar(require("../repositories/cardRepository"));
const encrypt_1 = require("../utils/encrypt");
function create(body, authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield sessionsServices.findSession(authorization);
        yield isValidTitle(body.title, userId);
        const encryptedPassword = (0, encrypt_1.encrypt)(body.password);
        const encryptedCvv = (0, encrypt_1.encrypt)(body.securityCode);
        const data = Object.assign(Object.assign({}, body), { password: encryptedPassword, securityCode: encryptedCvv });
        return yield cardRepository.create(data, userId);
    });
}
exports.create = create;
function getById(id, authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield sessionsServices.findSession(authorization);
        const card = yield cardRepository.findByIdAndUserId(id, userId);
        if (card.length === 0 && id)
            throw {
                type: "not_found",
                message: "Card(s) not found",
            };
        return cardReponseData(card);
    });
}
exports.getById = getById;
function deleteCard(id, authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield sessionsServices.findSession(authorization);
        const deletedCard = yield cardRepository.deleteCard(id, userId);
        if (deletedCard.count === 0)
            throw {
                type: "not_found",
                message: "Card(s) not found or invalid user",
            };
        return deletedCard;
    });
}
exports.deleteCard = deleteCard;
function isValidTitle(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const hasCard = yield cardRepository.findByTitleAndUserId(title, userId);
        if (hasCard)
            throw {
                type: "bad_request",
                message: "This Card already exists, try another name",
            };
        return hasCard;
    });
}
function cardReponseData(card) {
    const response = [];
    card.map((data) => {
        const decryptPassword = (0, encrypt_1.decrypt)(data.password);
        const decryptCvv = (0, encrypt_1.decrypt)(data.securityCode);
        response.push(Object.assign(Object.assign({}, data), { password: decryptPassword, securityCode: decryptCvv }));
    });
    return response;
}
