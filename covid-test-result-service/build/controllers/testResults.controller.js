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
var testResultMessage;
(function (testResultMessage) {
    testResultMessage[testResultMessage["positive"] = 0] = "positive";
    testResultMessage[testResultMessage["negative"] = 1] = "negative";
    testResultMessage[testResultMessage["invalidsample"] = 2] = "invalidsample";
})(testResultMessage || (testResultMessage = {}));
class TestResultsController {
    constructor() {
        this.saveResults = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log("REQUEST HEADER: " + JSON.stringify(req.headers));
            console.log("REQUEST BODY: " + JSON.stringify(req.body));
            const token = req.headers["x-api-key"];
            let isAuth = false;
            let statusCode = 201;
            let message = "All results are added";
            const transactionBlockedErrCode = '25P02';
            try {
                const tokenSearch = yield db_1.default.query(`
                select count(token) from tokens where token = $1
            `, [token]);
                const tokenCount = tokenSearch.rows[0].count;
                if (tokenCount > 0) {
                    isAuth = true;
                }
            }
            catch (error) {
                console.error(error);
            }
            if (isAuth) {
                yield db_1.default.query(`BEGIN`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (Array.isArray(req.body)) {
                        try {
                            for (const test of req.body) {
                                const testResultArr = Object.values(test);
                                yield db_1.default.query(`
                                    INSERT INTO testresults (appointmentId, appointmentStart, appointmentEnd, concernId, concernDescription, locationId, locationName, firstname, lastname, birthDate, eMail, mobileNumber, acceptedPrivacyDeclaration, acceptedTermsOfUse, testId, testResult, testDateTime) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
                                    RETURNING *
                                `, [...testResultArr], (err, result) => {
                                    if (err) {
                                        if (err.code !== transactionBlockedErrCode) {
                                            console.error("error: " + err);
                                            statusCode = 400;
                                            message = err.message;
                                        }
                                    }
                                });
                            }
                            yield db_1.default.query("COMMIT");
                        }
                        catch (error) {
                            console.error("overall error: " + error);
                            statusCode = 500;
                            message = error;
                            yield db_1.default.query("ROLLBACK");
                        }
                        finally {
                            res.status(statusCode).send({
                                message: message
                            });
                        }
                    }
                    else {
                        res.status(400).send({
                            message: "Request body should be array"
                        });
                    }
                }));
            }
            else {
                res.status(401).send({
                    message: "Wrong token"
                });
            }
        });
        this.getTestResult = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log("REQUEST HEADER: " + JSON.stringify(req.headers));
            console.log("REQUEST BODY: " + JSON.stringify(req.body));
            const { id } = req.params;
            let result;
            if (id) {
                try {
                    result = yield db_1.default.query(`
                    SELECT * FROM testResults WHERE appointmentid = $1
                `, [id]);
                    if (result.rows.length > 0) {
                        res.status(200).send(result);
                    }
                    else {
                        res.status(404).send({ message: "Not result found with provided id" });
                    }
                }
                catch (error) {
                    console.error("Error during searching results in database: " + error);
                }
            }
            else {
                res.status(400).send({ message: "ID is not provided" });
            }
        });
    }
}
;
exports.default = TestResultsController;
