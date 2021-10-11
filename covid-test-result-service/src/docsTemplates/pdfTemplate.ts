const pdf = require( 'pdf-creator-node' );
import fs from "fs";
import path from "path";
import constants from "../constants";
const QR = require( "qrcode-base64" );

async function pdfTemplate ( data: any ): Promise<string> {
    let pdfPath = "";
    const html = fs.readFileSync( path.join( __dirname, "./pdfTemplate.html" ), "utf8" );
    const { testresult, appointmentid, reqUrl } = data.data;
    let testResultBool = false;

    const qr64 = QR.drawImg( `${reqUrl}`, {
        typeNumber: 4,
        errorCorrectLevel: 'M',
        size: 500
    } );

    console.log( testresult, reqUrl );

    switch ( testresult ) {
        case "negative":
            testResultBool = false;
            break;
        case "positive":
            testResultBool = true;
        default:
            break;
    }

    const options = {
        format: "A4",
        orientaion: "portrait"
    };

    const document = {
        html: html,
        data: { ...data, testResultBool, qr: qr64 },
        path: "./output.pdf",
        type: "",
    };

    await pdf.create( document, options )
        .then( ( res: any ) => {
            pdfPath = res.filename;
            console.log( res.filename );
        } )
        .catch( ( error: any ) => {
            console.error( error );
        } );
    return pdfPath;
};

export default pdfTemplate;