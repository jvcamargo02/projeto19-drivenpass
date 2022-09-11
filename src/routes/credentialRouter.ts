import { Router } from "express";
import {
    create,
    deleteCredential,
    findById,
} from "../controllers/credentialController";
import { validateSchema } from "../middlewares/validateSchema";
import { credentialSchema } from "../schemas/credentialSchemas";

const credentialRoute = Router();

credentialRoute.post("/credential", validateSchema(credentialSchema), create);
credentialRoute.get("/credential", findById);
credentialRoute.delete("/credential/:id", deleteCredential);

export default credentialRoute;
