import express from "express";
import DocsController from "./../controllers/docs.controller";
const docsController = new DocsController();
const router = express.Router();

router.post( "/generatePdf", docsController.generatePdf );
// router.get( "/getTestResult/:id", docsController.getTestResult );

export default router;