import { Router } from "express";
import authenticationRoute from "./authenticationRouter";

const router = Router();

router.use(authenticationRoute);

export default router;
