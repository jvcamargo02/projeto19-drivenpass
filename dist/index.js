"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("express-async-errors");
const router_1 = __importDefault(require("./routes/router"));
const errorHandler_1 = require("./middlewares/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(router_1.default);
app.use(errorHandler_1.errorHandlerMiddleware);
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
