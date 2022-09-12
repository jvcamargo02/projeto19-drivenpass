"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.credentialSchema = joi_1.default.object({
    url: joi_1.default.string().uri().required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    title: joi_1.default.string().required()
});
