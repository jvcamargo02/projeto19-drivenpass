import { Router } from "express";
import { create, deleteWifi, getWifi } from "../controllers/wifiController";
import { validateSchema } from "../middlewares/validateSchema";
import { wifiSchema } from "../schemas/wifiSchemas";

const wifiRoute = Router();

wifiRoute.post("/wifi", validateSchema(wifiSchema), create);
wifiRoute.get('/wifi', getWifi)
wifiRoute.delete("/wifi/:id", deleteWifi)

export default wifiRoute