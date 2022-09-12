"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
function encrypt(data) {
    const SECRET = process.env.JWT_SECRET;
    const cryptr = new cryptr_1.default(SECRET);
    return cryptr.encrypt(data);
}
exports.encrypt = encrypt;
function decrypt(data) {
    const SECRET = process.env.JWT_SECRET;
    const cryptr = new cryptr_1.default(SECRET);
    return cryptr.decrypt(data);
}
exports.decrypt = decrypt;
