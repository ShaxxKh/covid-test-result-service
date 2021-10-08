import { Request, Response, NextFunction } from "express";
const pdf = require( "pdf-creator-node" );

class DocsController {
    generatePdf = async ( req: Request, res: Response, next: NextFunction ) => {
        console.log( "REQUEST HEADER: " + JSON.stringify( req.headers ) );
        console.log( "REQUEST BODY: " + JSON.stringify( req.body ) );
    };
};

export default DocsController;