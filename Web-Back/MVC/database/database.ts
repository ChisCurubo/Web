import mysql, { Connection } from 'mysql2/promise';
import Environment from 'shared/Environment';

export default class Database {
    private static connection: Connection;

    public static async getConnection(): Promise<Connection> {
        if (!Database.connection) {
            Database.connection = await mysql.createConnection({
                host: Environment.getDBHost(),  
                user: Environment.getDBUser(),  
                password: Environment.getDBPassword(),  
                database: Environment.getDBName(),
                port: Number(Environment.getDBPort())
            });
            console.log({
                host: Environment.getDBHost(),  
                user: Environment.getDBUser(),  
                password: Environment.getDBPassword(),  
                database: Environment.getDBName(),
                port: Environment.getDBPort()
            });
            console.log('Conexión a la base de datos establecida');
        }
        return Database.connection;
    }
    

    public static async executeQuery(query: string, params: any[] = []): Promise<any> {
        try {
            const connection = await Database.getConnection();
            const [rows] = await connection.execute(query, params);
            return Promise.resolve(rows);
        } catch (error) {
            console.error('Error en la consulta:', error);
            return Promise.resolve([]);
        }
    }
}