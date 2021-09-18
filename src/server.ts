require( "dotenv" ).config();
import express from "express";
import db from "./db";
import testResultsRouter from "./routes/testResults.routes";

db.connect();

const app = express();

app.use( express.json() );
app.use( "/api", testResultsRouter );

app.listen( process.env.PORT || 5000, () => {
  console.log( `Server is up on port ${process.env.PORT || 5000}` );
} );
