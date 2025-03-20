import { MySQLUsuarioQueries } from '../../../Mysql/infrastructura/Queries/MySQLUsuarioQueries';
import { IUsuarioRepository } from '../../Domain/Port/Driven/IUsuarioRepository';
import { IRespuestaUsuario, IUsuarioInfo } from '../../Domain/Usuario/interfaces/UsuarioInterfaces';
import NullUsuario from '../../Domain/Usuario/NullUsuario';
import Usuario from '../../Domain/Usuario/Usuario'; 

export class MySQLUsuarioRepository implements IUsuarioRepository {
    constructor(private readonly usuarioQueries: MySQLUsuarioQueries) {}
 
    async verMiCuentaId(idUsuario: number): Promise<IUsuarioInfo> {
        const rows = await this.usuarioQueries.findById(idUsuario);

        if (!rows || rows.length === 0) {
            return new NullUsuario().toInfo(); 
        }

        const nuevoUsuario = new Usuario(rows[0]);
        return nuevoUsuario.toInfo(); 
    }

    async verMiCuentaCorreo(correo: string): Promise<IUsuarioInfo> {
        const rows = await this.usuarioQueries.findByCorreo(correo);

        if (!rows || rows.length === 0) {
            return new NullUsuario().toInfo(); 
        }

        const nuevoUsuario = new Usuario(rows[0]); 
        return nuevoUsuario.toInfo(); 
    }


    public async cambiarRolUsuario(idUsuario: number, nuevoRol: number): Promise<IRespuestaUsuario> {
        try {
            // Verificar si el usuario existe
            const usuarioInfo = await this.usuarioQueries.findById(idUsuario);
            if (!usuarioInfo || usuarioInfo.length === 0) {
                return new NullUsuario().toInfomessege(); // Devuelve mensaje de NullUsuario
            }
    
            // Actualizar el rol del usuario
            const [result]: any = await this.usuarioQueries.updateRol(idUsuario, nuevoRol);
    
            if (result.affectedRows > 0) {
                return {
                    mensaje: "Rol de usuario actualizado exitosamente.",
                    usuario: usuarioInfo[0].toInfo(), 
                    nuevoRol: nuevoRol 
                } as IRespuestaUsuario; 
            } else {
                return new NullUsuario().toInfomessege(); 
            }
        } catch (error) {
            console.error("Error al cambiar el rol del usuario:", error);
            return new NullUsuario().toInfomessege(); 
        }
    }

    public async eliminarUsuario(idUsuario: number): Promise<IRespuestaUsuario> {
        try {
            // Verificar si el usuario existe
            const usuarioInfo = await this.usuarioQueries.findById(idUsuario);
            if (!usuarioInfo || usuarioInfo.length === 0) {
                return new NullUsuario().toInfomessege(); // Devuelve mensaje de NullUsuario
            }
    
            // Eliminar al usuario
            const [result]: any = await this.usuarioQueries.deleteUsuario(idUsuario);
    
            if (result.affectedRows > 0) {
                return {
                    mensaje: "Usuario eliminado exitosamente."
                } as IRespuestaUsuario; 
            } else {
                return new NullUsuario().toInfomessege(); 
            }
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            return new NullUsuario().toInfomessege(); 
        }
    }



}