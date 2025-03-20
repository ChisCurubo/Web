export interface IPagoQueries {
  findByUsuarioId(usuarioId: number): Promise<any[]>;  
    insertPago(usuario_id: any): Promise<any>;
  }
  