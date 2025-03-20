import { MySQLPagoQueries } from '../../../Mysql/infrastructura/Queries/MySQLPagoQueries';
import { IPagoInfo, IRespuestaPago } from '../../Domain/Pago/interfaces/PagoInterfaces';
import NullPago from '../../Domain/Pago/NullPago';

import PagoServiceInterface from '../../Domain/interfaces/PagoServiceInterface';
import Pago from '../../Domain/Pago/Pago';

export class MySQLPagoRepository implements PagoServiceInterface {
  constructor(private readonly pagoQueries: MySQLPagoQueries) {}

  async verPagoPorId(idnumber: number): Promise<IPagoInfo[]> {
    const rows = await this.pagoQueries.findByUsuarioId(idnumber);

    if (!rows || rows.length === 0) {
      return [new NullPago().toInfo()];
    }

    return rows.map((row) => new Pago(row).toInfo());


  }
  
  async procesarPago(idUsuario: number): Promise<IRespuestaPago> {
    try {
      if (!Number.isInteger(idUsuario)) {
        return new NullPago().toInfomessege();
  
      }
  
      const result = await this.pagoQueries.insertPago(idUsuario);
      
  
      const mensaje = result?.mensaje; 
    
  
      if (mensaje) {
        return {
          mensaje,
          
        } as IRespuestaPago;
      }
  
      return new NullPago().toInfomessege();
  
    } catch (error) {
        return new NullPago().toInfomessege();
    }
  }
  
  
  
  
}
