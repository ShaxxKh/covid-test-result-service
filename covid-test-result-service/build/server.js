"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const testResults_routes_1 = __importDefault(require("./routes/testResults.routes"));
const token_routes_1 = __importDefault(require("./routes/token.routes"));
const cors = require("cors");
db_1.default.connect()
    .then(() => console.log("Successfully connected to database"))
    .catch((err) => console.error("Error occured during connection to database" + err));
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.use("/api", testResults_routes_1.default, token_routes_1.default);
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is up on port ${process.env.PORT || 5000}`);
});
