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
            const dbRequest = await db.query( `BEGIN`, async ( err: any, result: any ) => {
                try {
                    for ( const test of req.body ) {
                        const testResultArr = Object.values( test );


                        const dbRes = await db.query( `
                                INSERT INTO testresults (appointmentId, appointmentStart, appointmentEnd, concernId, concernDescription, locationId, locationName, firstname, lastname, birthDate, eMail, mobileNumber, acceptedPrivacyDeclaration, acceptedTermsOfUse, testId, testResult, testDateTime) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
                                RETURNING *
                            `, [ ...testResultArr ], ( err: any, result: any ) => {
                            if ( err ) {
                                console.log( "error: " + err );
                                // throw new Error( err );
                            } else {
                                console.log( "good job: " + result );
                            }
                        } );

                    }

                    await db.query( "COMMIT" );
                } catch ( error ) {
                    console.log( "overall error: " + error );
                    res.status( 400 ).send( {
                        message: error
                    } );
                    await db.query( "END" );
                }

            } );
            res.status( 201 ).send( {
                message: "Test results are added"
            } );

            // const dbRequestPromise: Promise<string> = new Promise<string>( async ( resolve, reject ) => {
            //     for ( const test of req.body ) {
            //         const testResultArr = Object.values( test );


            //         const dbRes = await db.query( `
            //                 INSERT INTO testresults (appointmentId, appointmentStart, appointmentEnd, concernId, concernDescription, locationId, locationName, firstname, lastname, birthDate, eMail, mobileNumber, acceptedPrivacyDeclaration, acceptedTermsOfUse, testId, testResult, testDateTime) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            //                 RETURNING *
            //             `, [ ...testResultArr ], ( err: any, res: any ) => {
            //             if ( err ) {
            //                 reject( err.message );

            //             } else {
            //                 console.log( "good job" );
            //             }
            //         } );

            //     }
            //     resolve( "" );
            // } );

            // await db.query( `COMMIT` );

            // await dbRequestPromise.then( () => {
            //     res.status( 201 ).send( {
            //         message: "Test results are added"
            //     } );
            // } ).catch( async ( error: any ) => {
            //     await db.query( `ROLLBACK` );
            //     console.error( "Error occured while posting data to db: " + error );
            //     res.status( 400 ).send( {
            //         message: error
            //     } );
            // } );


        } else {
            res.status( 401 ).send( {
                message: "Wrong token"
            } );
        }

    };
};

export default TestResultsController;