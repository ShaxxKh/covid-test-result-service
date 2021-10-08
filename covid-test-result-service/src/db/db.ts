import { promisify } from "util";

import { Client } from "pg";

interface dbOptions {
  ssl: boolean;
  host: string;
  database: string;
  user: string;
  port: number;
  password: string;
}

const dbOptions: dbOptions = {
  ssl: false,
  host: process.env.PG_HOST || "",
  database: process.env.PG_DATABASE || "",
  user: process.env.PG_USER || "",
  port: parseInt( process.env.PG_PORT || "5432" ),
  password: process.env.PG_PASSWORD || "",
};

const client = new Client( dbOptions );



export default client;