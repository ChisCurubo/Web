// Interfaces para Usuario
export interface IRegistroUsuario {
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    rol: number;
  }
  
  export interface UsuarioInterface {
    idUsuario: number;
    nombreUsuario: string;
    apellidoUsuario: string;
    correoUsuario: string;
    contrasenaUsuario: string;
    estadoUsuario: number;
    rolId: number;
    cedula: string;
  }
  export interface IUsuarioInfo {
    idUsuario: number;
    nombreUsuario: string;
    apellidoUsuario: string;
    correoUsuario: string;
    estadoUsuario: number;
    rolUsuario: string;
    cedula: string;
  }


  export interface IRespuestaUsuario {
    mensaje: string;
}