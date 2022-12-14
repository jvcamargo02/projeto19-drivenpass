"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cardControllers_1 = require("../controllers/cardControllers");
const validateSchema_1 = require("../middlewares/validateSchema");
const cardSchema_1 = require("../schemas/cardSchema");
const cardsRouter = (0, express_1.Router)();
cardsRouter.post("/cards", (0, validateSchema_1.validateSchema)(cardSchema_1.cardSchema), cardControllers_1.create);
cardsRouter.get("/cards", cardControllers_1.getCard);
cardsRouter.delete("/cards/:id", cardControllers_1.deleteCard);
exports.default = cardsRouter;
