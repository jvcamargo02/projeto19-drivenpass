"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticationRouter_1 = __importDefault(require("./authenticationRouter"));
const cardsRouter_1 = __importDefault(require("./cardsRouter"));
const credentialRouter_1 = __importDefault(require("./credentialRouter"));
const notesRouter_1 = __importDefault(require("./notesRouter"));
const wifiRoutes_1 = __importDefault(require("./wifiRoutes"));
const router = (0, express_1.Router)();
router.use(authenticationRouter_1.default);
router.use(credentialRouter_1.default);
router.use(notesRouter_1.default);
router.use(cardsRouter_1.default);
router.use(wifiRoutes_1.default);
exports.default = router;
