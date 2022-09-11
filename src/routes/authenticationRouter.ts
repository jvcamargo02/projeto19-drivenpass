import { Router } from "express"
import { signin, signup } from "../controllers/authenticationController"
import { validateSchema } from "../middlewares/validateSchema"
import { authSchema } from "../schemas/authenticationSchemas"

const authenticationRoute = Router()

authenticationRoute.post("/signup",
    validateSchema(authSchema),
    signup
)

authenticationRoute.post("/signin",
    validateSchema(authSchema),
    signin
)

export default authenticationRoute