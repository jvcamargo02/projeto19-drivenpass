import { Router } from "express";
import authenticationRoute from "./authenticationRouter";
import cardsRouter from "./cardsRouter";
import credentialRoute from "./credentialRouter";
import notesRoute from "./notesRouter";
import wifiRoute from "./wifiRoutes";

const router = Router();

router.use(authenticationRoute);
router.use(credentialRoute)
router.use(notesRoute)
router.use(cardsRouter)
router.use(wifiRoute)

export default router;
