import { Router } from "express";
import authenticationRoute from "./authenticationRouter";
import cardsRouter from "./cardsRouter";
import credentialRoute from "./credentialRouter";
import notesRoute from "./notesRouter";

const router = Router();

router.use(authenticationRoute);
router.use(credentialRoute)
router.use(notesRoute)
router.use(cardsRouter)

export default router;
