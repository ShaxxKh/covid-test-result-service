"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_controller_1 = __importDefault(require("../controllers/token.controller"));
const router = express_1.default.Router();
const tokenController = new token_controller_1.default();
router.get("/getToken", tokenController.getToken);
exports.default = router;
