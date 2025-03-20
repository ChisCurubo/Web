import mysql, { Pool } from "mysql2/promise";
import dotenv from "dotenv";
import IDatabase from "../../Domain/IDatabase"

dotenv.config();

class MySQLDatabase implements IDatabase {
  private static instance: MySQLDatabase;
  private pool: Pool;

  private constructor() {
    this.pool = mysql.createPool({
      host: process.env["DB_HOST"] || "localhost",
      user: process.env["DB_USER"] || "root",
      password: process.env["DB_PASSWORD"] || "",
      database: process.env["DB_NAME"] || "test",
      waitForConnections: true,
      connectionLimit: 10,
    });
  }

  public static getInstance(): MySQLDatabase {
    if (!MySQLDatabase.instance) {
      MySQLDatabase.instance = new MySQLDatabase();
    }
    return MySQLDatabase.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }
}

export default MySQLDatabase.getInstance();
