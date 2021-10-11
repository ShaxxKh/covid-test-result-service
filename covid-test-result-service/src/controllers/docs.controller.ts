import { Request, Response, NextFunction } from "express";
import pdfTemplate from "../docsTemplates/pdfTemplate";
const pdf = require( "pdf-creator-node" );
import fs from "fs";

class DocsController {
    generatePdf = async ( req: Request, res: Response, next: NextFunction ) => {
        console.log( "REQUEST HEADER: " + JSON.stringify( req.headers ) );
        console.log( "REQUEST BODY: " + JSON.stringify( req.body ) );

        const pdfPath = await pdfTemplate( { data: req.body } );

        var filestream = fs.createReadStream( pdfPath );
        filestream.pipe( res );
    };
};

export default DocsController;