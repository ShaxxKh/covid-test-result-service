import { Request, Response, NextFunction } from "express";
import pdfTemplate from "../docsTemplates/pdfTemplate";
const pdf = require( "pdf-creator-node" );
import fs from "fs";

class DocsController {
    generatePdf = async ( req: Request, res: Response, next: NextFunction ) => {
        console.log( "REQUEST HEADER: " + JSON.stringify( req.headers ) );
        console.log( "REQUEST BODY: " + JSON.stringify( req.body ) );

        const pdfPath = await pdfTemplate( { data: req.body } );
        // res.setHeader( "Content-Disposition", "inline; filename=picture.png" );
        // await res.writeHead( 200, {
        //     // 'Content-Length': Buffer.byteLength(  ),
        //     // 'Content-Type': 'text/plain',
        //     'Content-Disposition': 'inline; filename="picture.png"'
        // } );
        // res.download( pdfPath );
        // res.sendFile( pdfPath, {
        // headers: {
        // 'Content-Type': 'text/plain',
        // 'Content-Disposition': 'inline; filename="picture.png"';
        // }
        // } );
        var file = fs.createReadStream( pdfPath );
        var stat = fs.statSync( pdfPath );
        res.setHeader( 'Content-Length', stat.size );
        res.setHeader( 'Content-Type', 'text/pdf' );
        res.setHeader( 'Content-Disposition', 'attachment; filename=quote.pdf' );
        file.pipe( res );
    };
};

export default DocsController;