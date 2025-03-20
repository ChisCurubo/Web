import { Pool } from "mysql2/promise";

export default interface IDatabase {
  getPool(): Pool;
}
