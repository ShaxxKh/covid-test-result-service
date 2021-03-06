require( "dotenv" ).config();
import express from "express";
import db from "./db/db";
import testResultsRouter from "./routes/testResults.routes";
import tokenRouter from "./routes/token.routes";
import docsRouter from "./routes/docs.router";
import createTables from "./db/createTable";
const cors = require( "cors" );



db.connect()
  .then( () => {
    createTables();
    console.log( "Successfully connected to database" );
  } )
  .catch( ( err: any ) => console.error( "Error occured during connection to database" + err ) );


const app = express();

app.use( cors() );
app.use( express.json() );
app.use( "/api", testResultsRouter, tokenRouter, docsRouter );

app.listen( process.env.PORT || 5000, () => {
  console.log( `Server is up on port ${process.env.PORT || 5000}` );
} );
