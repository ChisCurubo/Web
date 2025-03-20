import { Pool } from "mysql2/promise";
import MySQLDatabase from "../Singelom/MySQLDatabase"; // Asegúrate de importar la clase de base de datos
import { IUsuarioQueries } from "../../Domain/IUsuarioQueries";


export class MySQLUsuarioQueries implements IUsuarioQueries {
    private readonly pool: Pool;

    constructor() {
        this.pool = MySQLDatabase.getPool();
    }

    async findById(idUsuario: number): Promise<any[]> {
        const [rows]: any = await this.pool.execute(
            `SELECT u.idUsuario, u.nombreUsuario, u.apellidoUsuario, 
                    u.correoUsuario, u.cedulaUsuario, u.estadoUsuario, 
                    r.nombreRol AS rolUsuario
             FROM Usuarios u
             LEFT JOIN Roles r ON u.rol_id = r.idRol
             WHERE u.idUsuario = ?`,
            [idUsuario]
        );
        return rows;
    }

    async findByCorreo(correo: string): Promise<any[]> {
        const [rows]: any = await this.pool.execute(
            `SELECT u.idUsuario, u.nombreUsuario, u.apellidoUsuario, 
                    u.correoUsuario, u.cedulaUsuario, u.estadoUsuario, 
                    r.nombreRol AS rolUsuario
             FROM Usuarios u
             LEFT JOIN Roles r ON u.rol_id = r.idRol
             WHERE u.correoUsuario = ?`,
            [correo]
        );
        return rows;
    }


    async updateRol(idUsuario: number, nuevoRol: number): Promise<any> {
        console.log('Nuevo rol:', nuevoRol); // <-- Verifica el valor que recibe
        
        const [rolExistente] = await this.pool.execute(
            `SELECT idRol FROM Roles WHERE idRol = ?`,
            [nuevoRol]
        );
    
        console.log('Resultado de la consulta rolExistente:', rolExistente); // <-- Muestra el resultado de la consulta
    
        if (!rolExistente || (rolExistente as any[]).length === 0) {
            throw new Error('El rol especificado no existe');
        }
    
        return await this.pool.execute(
            `UPDATE Usuarios SET rol_id = ? WHERE idUsuario = ?`,
            [nuevoRol, idUsuario]
        );
    }
    
    async deleteUsuario(idUsuario: number): Promise<any> {
        // Verificar si existen dependencias antes de eliminar
        const [rows] = await this.pool.execute(
            `SELECT idCarrito FROM Carrito WHERE usuario_id = ?`,
            [idUsuario]
        );
    
        if ((rows as any[]).length > 0) {
            throw new Error('No se puede eliminar el usuario porque tiene datos asociados');
        }
    
        return await this.pool.execute(
            `DELETE FROM Usuarios WHERE idUsuario = ?`,
            [idUsuario]
        );
    }
    
    
}