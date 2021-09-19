import db from "../db";
import { Request, Response, NextFunction, response } from "express";

enum testResultMessage {
    "positive",
    "negative",
    "invalidsample"
}

interface TestResults {
    appointmentId: string,
    appointmentStart: Date,
    appointmentEnd: Date,
    concernId: string,
    concernDescription: string,
    locationId: string,
    locationName: string,
    firstname: string,
    lastname: string,
    birthDate: Date,
    eMail: string,
    mobileNumber: string,
    acceptedPrivacyDeclaration: string,
    acceptedTermsOfUse: string,
    testId: string,
    testResult: testResultMessage,
    testDateTime: Date;

}

class TestResultsController {
    saveResults = async ( req: Request, res: Response, next: NextFunction ) => {
        const token: any = req.headers[ "x-api-key" ];
        let isAuth: boolean = false;

        try {
            const tokenSearch = await db.query( `
                select count(token) from tokens where token = $1
            `, [ token ] );
            const tokenCount: number = tokenSearch.rows[ 0 ].count;
            if ( tokenCount > 0 ) {
                isAuth = true;
            }

        } catch ( error ) {
            console.error( error );
        }

        if ( isAuth ) {
            await req.body.forEach( async ( test: TestResults ) => {
                const testResultsObj: TestResults = test;
                const testResultArr = Object.values( testResultsObj );

                try {
                    const dbRes = await db.query( `
                            INSERT INTO testresults (appointmentId, appointmentStart, appointmentEnd, concernId, concernDescription, locationId, locationName, firstname, lastname, birthDate, eMail, mobileNumber, acceptedPrivacyDeclaration, acceptedTermsOfUse, testId, testResult, testDateTime) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
                            RETURNING *
                            `, [ ...testResultArr ] );
                } catch ( error ) {
                    console.error( error );
                }
            } );
            res.send( {
                message: "Test results are added"
            } );
        } else {
            res.send( {
                message: "Wrong token"
            } );
        }

    };
};

export default TestResultsController;