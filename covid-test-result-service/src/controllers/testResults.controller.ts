import db from "../db/db";
import { Request, Response, NextFunction } from "express";

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
        console.log( "REQUEST HEADER: " + JSON.stringify( req.headers ) );
        console.log( "REQUEST BODY: " + JSON.stringify( req.body ) );
        const token: any = req.headers[ "x-api-key" ];
        let isAuth: boolean = false;
        let statusCode: number = 201;
        let message: any = "All results are added";
        const transactionBlockedErrCode = '25P02';

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
            await db.query( `BEGIN`, async ( err: any, result: any ) => {
                if ( Array.isArray( req.body ) ) {
                    try {
                        for ( const test of req.body ) {
                            const testResultArr = Object.values( test );

                            await db.query( `
                                    INSERT INTO testresults (appointmentId, appointmentStart, appointmentEnd, concernId, concernDescription, locationId, locationName, firstname, lastname, birthDate, eMail, mobileNumber, acceptedPrivacyDeclaration, acceptedTermsOfUse, testId, testResult, testDateTime) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
                                    RETURNING *
                                `, [ ...testResultArr ], ( err: any, result: any ) => {
                                if ( err ) {
                                    if ( err.code !== transactionBlockedErrCode ) {
                                        console.error( "error: " + err );
                                        statusCode = 400;
                                        message = err.message;
                                    }

                                }
                            } );
                        }
                        await db.query( "COMMIT" );
                    } catch ( error: any ) {
                        console.error( "overall error: " + error );
                        statusCode = 500;
                        message = error;
                        await db.query( "ROLLBACK" );
                    } finally {
                        res.status( statusCode ).send( {
                            message: message
                        } );
                    }
                } else {
                    res.status( 400 ).send( {
                        message: "Request body should be array"
                    } );
                }
            } );

        } else {
            res.status( 401 ).send( {
                message: "Wrong token"
            } );
        }
    };

    getTestResult = async ( req: Request, res: Response, next: NextFunction ) => {
        console.log( "REQUEST HEADER: " + JSON.stringify( req.headers ) );
        console.log( "REQUEST BODY: " + JSON.stringify( req.body ) );
        const { id } = req.params;
        let result;

        if ( id ) {
            try {
                result = await db.query( `
                    SELECT * FROM testResults WHERE appointmentid = $1
                `, [ id ] );
                if ( result.rows.length > 0 ) {
                    res.status( 200 ).send( result );
                } else {
                    res.status( 404 ).send( { message: "Not result found with provided id" } );
                }

            } catch ( error ) {
                console.error( "Error during searching results in database: " + error );
            }
        } else {
            res.status( 400 ).send( { message: "ID is not provided" } );
        }
    };
};

export default TestResultsController;