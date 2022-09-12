"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.cardSchema = joi_1.default.object({
    number: joi_1.default.number().required(),
    holderName: joi_1.default.string().required(),
    securityCode: joi_1.default.string().required(),
    expirationDate: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    isVirtual: joi_1.default.boolean().required(),
    type: joi_1.default.string().valid("credit", "debit", "both"),
    title: joi_1.default.string().required()
});
/*
    number: number,
    holderName: string,
    securityCode: string,
    expirationDate: number,
    password: string,
    isVirtual: boolean,
    type: string
    title: string
*/ 
