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
exports.deleteWifi = exports.findByIdAndUserId = exports.create = void 0;
const database_1 = require("../config/database");
function create(wifiData, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, password, title } = wifiData;
        return yield database_1.prisma.wifi.create({
            data: {
                name,
                password,
                title,
                userId
            },
        });
    });
}
exports.create = create;
function findByIdAndUserId(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.wifi.findMany({
            where: {
                id,
                userId
            }
        });
    });
}
exports.findByIdAndUserId = findByIdAndUserId;
function deleteWifi(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield database_1.prisma.wifi.deleteMany({
            where: {
                AND: [
                    {
                        id,
                    },
                    {
                        userId,
                    },
                ],
            }
        });
        return wifi;
    });
}
exports.deleteWifi = deleteWifi;
