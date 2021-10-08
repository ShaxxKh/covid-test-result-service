import db from "../db/db";
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

class TokenController {
    getToken = async ( req: Request, res: Response, next: NextFunction ) => {
        const token = crypto.randomBytes( 64 ).toString( "hex" );
        try {
            await db.query( `
                INSERT INTO tokens (token)
                VALUES ($1)
                RETURNING *
            `, [ token ] );
        } catch ( error ) {
            res.status( 400 );
            console.error( error );
        }

        res.send( { message: "Token created", token } );
    };
}

export default TokenController;