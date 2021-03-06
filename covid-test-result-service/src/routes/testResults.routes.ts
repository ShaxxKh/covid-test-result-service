import express from "express";
import TestResultsContoller from "./../controllers/testResults.controller";
const router = express.Router();
const testResultsContoller = new TestResultsContoller();

router.post( "/SetTestingResults", testResultsContoller.saveResults );
router.get( "/getTestResult/:id", testResultsContoller.getTestResult );

export default router;