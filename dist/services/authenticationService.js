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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticationRepository = __importStar(require("../repositories/authenticationRepository"));
const sessionRepository = __importStar(require("../repositories/sessionRepositories"));
function signUp(signUp) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = signUp;
        passwordCheck(password);
        yield isUniqueEmail(email);
        const hashedPassword = yield hashPassword(password);
        return yield authenticationRepository.create({
            email,
            password: hashedPassword,
        });
    });
}
exports.signUp = signUp;
function signIn(signIn) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = signIn;
        const user = yield isValidEmail(email);
        yield isValidPassword(password, user.password);
        const session = yield sessionRepository.newSession(user.id);
        const token = generateToken(session.id);
        return token;
    });
}
exports.signIn = signIn;
function generateToken(sessionId) {
    const SECRET = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign({ sessionId }, SECRET, {
        expiresIn: "30d",
    });
}
;
function isUniqueEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield checkEmail(email);
        if (user)
            throw { type: "unauthorized", message: "E-mail already registered" };
    });
}
function isValidEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield checkEmail(email);
        if (!user)
            throw { type: "not_found", message: "Incorrect email or password" };
        return user;
    });
}
function checkEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield authenticationRepository.findByEmail(email);
        return user;
    });
}
function passwordCheck(password) {
    if (password.length < 10) {
        throw {
            type: "unprocessable_entity",
            message: "Password must be have 10 characters",
        };
    }
}
function hashPassword(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt();
        return yield bcrypt_1.default.hash(data, salt);
    });
}
function isValidPassword(password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const verify = bcrypt_1.default.compareSync(password, hashedPassword);
        if (!verify)
            throw { type: "unathorized", message: "Incorrect email or password" };
    });
}
