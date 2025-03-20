import { Pool } from "mysql2/promise"; // Asegúrate de importar Pool
import MySQLDatabase from "../../../Mysql/infrastructura/Singelom/MySQLDatabase"; // Asegúrate de que la ruta sea correcta
import bcrypt from "bcrypt";

export class MySQLAuthQueries {
    private readonly pool: Pool;

    constructor() {
        this.pool = MySQLDatabase.getPool(); 
    }

    public async findUserByEmail(correoUsuario: string): Promise<any> {
        const [rows]: any = await this.pool.execute(
            "SELECT * FROM Usuarios WHERE correoUsuario = ? LIMIT 1",
            [correoUsuario]
        );
        return rows;
    }

    public async insertSession(idUsuario: number, token: string): Promise<any> {
        return await this.pool.execute(
            `INSERT INTO Sesiones (idUsuario, token) VALUES (?, ?)`,
            [idUsuario, token]
        );
    }

    public async insertUser(
        nombre: string,
        apellido: string,
        correo: string,
        contrasena: string,
        estado: number = 1,
        rol: number | null = null // Permitir que rol sea null
    ): Promise<any> {
        return await this.pool.execute(
            `INSERT INTO Usuarios (nombreUsuario, apellidoUsuario, correoUsuario, contrasenaUsuario, estadoUsuario, rol_id)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, apellido, correo, contrasena, estado, rol]
        );
    }

    public async deleteSession(token: string): Promise<any> {
        return await this.pool.execute(
            `DELETE FROM Sesiones WHERE token = ?`,
            [token]
        );
    }

    public async findSession(token: string): Promise<any> {
        const [rows]: any = await this.pool.execute(
            `SELECT token FROM Sesiones WHERE token = ?`,
            [token]
        );
        return rows;
    }

    public async updateUserPassword(correoUsuario: string, nuevaContrasena: string): Promise<any> {
        const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
        return await this.pool.execute(
            `UPDATE Usuarios SET contrasenaUsuario = ? WHERE correoUsuario = ?`,
            [hashedPassword, correoUsuario]
        );
    }

    public async getUserById(idUsuario: number): Promise<any> {
        const [rows]: any = await this.pool.execute(
            `SELECT * FROM Usuarios WHERE idUsuario = ? LIMIT 1`,
            [idUsuario]
        );
        return rows;
    }

    public async isUserActive(idUsuario: number): Promise<boolean> {
        const [rows]: any = await this.pool.execute(
            `SELECT estadoUsuario FROM Usuarios WHERE idUsuario = ? LIMIT 1`,
            [idUsuario]
        );
        return rows.length > 0 && rows[0].estadoUsuario === 1;
    }
}