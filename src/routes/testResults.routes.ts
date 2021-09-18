import express from "express";
import { runInContext } from "vm";
import TestResultsContoller from "./../controllers/testResults.controller";
const router = express.Router();
const testResultsContoller = new TestResultsContoller();

router.post( "/SetTestingResults", testResultsContoller.saveResults );

export default router;