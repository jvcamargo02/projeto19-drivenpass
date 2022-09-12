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
exports.deleteCredential = exports.findById = exports.create = void 0;
const sessionsService = __importStar(require("./sessionsServices"));
const credentialRepository = __importStar(require("../repositories/credentialRepositories"));
const encrypt_1 = require("../utils/encrypt");
function create(credentialData, authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, title } = credentialData;
        const userId = yield sessionsService.findSession(authorization);
        yield findCredentialByTitle(userId, title);
        const encryptedPassword = (0, encrypt_1.encrypt)(password);
        const data = Object.assign(Object.assign({}, credentialData), { password: encryptedPassword, userId });
        return yield credentialRepository.create(data);
    });
}
exports.create = create;
function findById(id, authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield sessionsService.findSession(authorization);
        const credential = yield credentialRepository.findByIdAndUserId(id, userId);
        if (credential.length === 0 && id)
            throw {
                type: "not_found",
                message: "Credential(s) not found",
            };
        return controllerResponseData(credential);
    });
}
exports.findById = findById;
function controllerResponseData(credential) {
    const credentials = [];
    credential.map((data) => {
        const decryptPassword = (0, encrypt_1.decrypt)(data.password);
        credentials.push(Object.assign(Object.assign({}, data), { password: decryptPassword }));
    });
    return credentials;
}
function deleteCredential(id, authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield sessionsService.findSession(authorization);
        const credential = yield credentialRepository.deleteCredential(id, userId);
        if (credential.count === 0)
            throw {
                type: "not_found",
                message: "Credential not found or invalid user",
            };
        return credential;
    });
}
exports.deleteCredential = deleteCredential;
function findCredentialByTitle(userId, title) {
    return __awaiter(this, void 0, void 0, function* () {
        const hasCredential = yield credentialRepository.findByTitleAndUserId(userId, title);
        if (hasCredential)
            throw {
                type: "bad_request",
                message: "This credential already exists, try another name",
            };
        return hasCredential;
    });
}
