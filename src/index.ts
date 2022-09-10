import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import "express-async-errors"
import router from "./routes/router"
import { errorHandlerMiddleware } from "./middlewares/errorHandler"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
app.use(errorHandlerMiddleware)


const PORT: number = Number(process.env.PORT) || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
