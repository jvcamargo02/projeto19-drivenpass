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
exports.deleteWifi = exports.getById = exports.create = void 0;
const sessionsServices = __importStar(require("../services/sessionsServices"));
const wifiRepository = __importStar(require("../repositories/wifiRepository"));
const encrypt_1 = require("../utils/encrypt");
function create(wifiData, authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield sessionsServices.findSession(authorization);
        const encryptedPassword = (0, encrypt_1.encrypt)(wifiData.password);
        const data = Object.assign(Object.assign({}, wifiData), { password: encryptedPassword });
        return yield wifiRepository.create(data, userId);
    });
}
exports.create = create;
function getById(id, authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield sessionsServices.findSession(authorization);
        const wifi = yield wifiRepository.findByIdAndUserId(id, userId);
        if (wifi.length === 0 && id)
            throw {
                type: "not_found",
                message: "Wifi(s) not found",
            };
        return wifiResponseData(wifi);
    });
}
exports.getById = getById;
function deleteWifi(id, authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield sessionsServices.findSession(authorization);
        const deletedWifi = yield wifiRepository.deleteWifi(id, userId);
        if (deletedWifi.count === 0)
            throw {
                type: "not_found",
                message: "Card(s) not found or invalid user",
            };
        return deletedWifi;
    });
}
exports.deleteWifi = deleteWifi;
function wifiResponseData(wifi) {
    const response = [];
    wifi.map((data) => {
        const decryptPassword = (0, encrypt_1.decrypt)(data.password);
        response.push(Object.assign(Object.assign({}, data), { password: decryptPassword }));
    });
    return response;
}
