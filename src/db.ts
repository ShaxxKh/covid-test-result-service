const { Client } = require( "pg" );

interface dbOptions {
  ssl: {
    rejectUnauthorized: boolean;
  };
  host: string;
  database: string;
  user: string;
  port: number;
  password: string;
}

const client = new Client( {
  ssl: {
    rejectUnauthorized: false,
  },
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  port: parseInt( process.env.PG_PORT || "5000" ),
  password: process.env.PG_PASSWORD,
} );

export default client;
