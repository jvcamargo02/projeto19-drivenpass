import { Router } from "express"
import { signup } from "../controllers/authenticationController"
import { validateSchema } from "../middlewares/validateSchema"
import { signupSchema } from "../schemas/authenticationSchemas"

const authenticationRoute = Router()

authenticationRoute.post("/signup",
    validateSchema(signupSchema),
    signup
)

export default authenticationRoute