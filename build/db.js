"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Client } = require("pg");
const dbOptions = {
    ssl: {
        rejectUnauthorized: false,
    },
    host: process.env.PG_HOST || "",
    database: process.env.PG_DATABASE || "",
    user: process.env.PG_USER || "",
    port: parseInt(process.env.PG_PORT || "5432"),
    password: process.env.PG_PASSWORD || "",
};
const client = new Client(dbOptions);
exports.default = client;
