"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const crypto_1 = __importDefault(require("crypto"));
class TokenController {
    constructor() {
        this.getToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = crypto_1.default.randomBytes(64).toString("hex");
            try {
                yield db_1.default.query(`
                INSERT INTO tokens (token)
                VALUES ($1)
                RETURNING *
            `, [token]);
            }
            catch (error) {
                res.status(400);
                console.error(error);
            }
            res.send({ message: "Token created", token });
        });
    }
}
exports.default = TokenController;
