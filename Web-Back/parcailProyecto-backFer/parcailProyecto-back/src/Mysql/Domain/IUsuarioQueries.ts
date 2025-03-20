

export interface IUsuarioQueries {
    findById(idUsuario: number): Promise<any[]>;
    findByCorreo(correo: string): Promise<any[]>;
    updateRol(idUsuario: number, nuevoRol: number): Promise<any>; 
    deleteUsuario(idUsuario: number): Promise<any>; 
}