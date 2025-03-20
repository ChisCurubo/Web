import { MySQLUsuarioQueries } from '../../../Mysql/infrastructura/Queries/MySQLUsuarioQueries';
import { IUsuarioRepository } from '../../Domain/Port/Driven/IUsuarioRepository';
import { IRespuestaUsuario, IUsuarioInfo, UsuarioInterface } from '../../Domain/Usuario/interfaces/UsuarioInterfaces';
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
            console.log('ID del usuario:', idUsuario);
            console.log('Nuevo rol:', nuevoRol);
    
            // Obtener la información del usuario
            const usuarioInfo = await this.usuarioQueries.findById(idUsuario);
            console.log('Información del usuario:', usuarioInfo);
    
            if (!usuarioInfo || usuarioInfo.length === 0) {
                console.log('Usuario no encontrado');
                return new NullUsuario().toInfomessege(); 
            }
    
            
            const usuarioData = usuarioInfo[0];
            const usuario: UsuarioInterface = {
                idUsuario: usuarioData.idUsuario,
                nombreUsuario: usuarioData.nombreUsuario,
                apellidoUsuario: usuarioData.apellidoUsuario,
                correoUsuario: usuarioData.correoUsuario,
                contrasenaUsuario: usuarioData.contrasenaUsuario,
                estadoUsuario: usuarioData.estadoUsuario,
                rolId: usuarioData.rolId,
                cedula: usuarioData.cedula
            };
    
            const nuevoUsuario = new Usuario(usuario); 
    
            
            const [result] = await this.usuarioQueries.updateRol(idUsuario, nuevoRol);
            console.log('Resultado de la actualización:', result);
    
            if (result.affectedRows > 0) {
                console.log('Rol actualizado exitosamente');
                return {
                    mensaje: "Rol de usuario actualizado exitosamente.",
                    usuario: nuevoUsuario.toInfo(), 
                    nuevoRol: nuevoRol
                } as IRespuestaUsuario;
            } else {
                console.log('No se pudo actualizar el rol');
                return new NullUsuario().toInfomessege();
            }
        } catch (error) {
            console.error('Error al cambiar el rol del usuario:', error);
            return new NullUsuario().toInfomessege();
        }
    }
  
    public async eliminarUsuario(idUsuario: number): Promise<IRespuestaUsuario> {
        try {
            
            const usuarioInfo = await this.usuarioQueries.findById(idUsuario);
            if (!usuarioInfo || usuarioInfo.length === 0) {
                return new NullUsuario().toInfomessege(); 
            }
    
           
            const [result]: any = await this.usuarioQueries.deleteUsuario(idUsuario);
    
            if (result.affectedRows > 0) {
                return {
                    mensaje: "Usuario eliminado exitosamente."
                } as IRespuestaUsuario; 
            } else {
                return new NullUsuario().toInfomessege(); 
            }
        } catch (error) {
            
            return new NullUsuario().toInfomessege(); 
        }
    }



}