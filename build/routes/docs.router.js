"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const docs_controller_1 = __importDefault(require("./../controllers/docs.controller"));
const docsController = new docs_controller_1.default();
const router = express_1.default.Router();
router.post("/generatePdf", docsController.generatePdf);
// router.get( "/getTestResult/:id", docsController.getTestResult );
exports.default = router;
