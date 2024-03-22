import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
    sslmode: "require",
    max: 5,
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 20000,
});

pool.connect();

console.log("Connected to Database");

export default pool;