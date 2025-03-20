import PagoServiceInterface from "../../Domain/interfaces/PagoServiceInterface";
import { IPagoInfo, IRespuestaPago } from "../../Domain/Pago/interfaces/PagoInterfaces";
import { IPagoRepository } from "../../Domain/Port/Driven/IUsuarioRepository";

export default class PagoService implements PagoServiceInterface {
  constructor(private readonly pagoRepository: IPagoRepository) {}

  async verPagoPorId(idPago: number): Promise<IPagoInfo[] > {
   
    return await this.pagoRepository.verPagoPorId(idPago);
  }

  async procesarPago(usuarioId: number): Promise<IRespuestaPago> {
    
    return await this.pagoRepository.procesarPago(usuarioId);
  }
}
