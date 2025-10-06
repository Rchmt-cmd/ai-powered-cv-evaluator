import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "12345",
  port: process.env.DB_PORT || "3306",
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error(`Error connecting to MySQL: ${err.stack}`);
    return;
  }
  console.log("✅ MySQL connected!");
  conn.release();
});

export default pool;
