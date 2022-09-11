import { Router } from "express";
import { create, deleteCard, getCard } from "../controllers/cardControllers";
import { validateSchema } from "../middlewares/validateSchema";
import { cardSchema } from "../schemas/cardSchema";

const cardsRouter = Router();

cardsRouter.post("/cards", validateSchema(cardSchema), create);
cardsRouter.get("/cards", getCard);
cardsRouter.delete("/cards/:id", deleteCard)

export default cardsRouter;
