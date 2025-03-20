import { IRespuestaPago, IPagoInfo } from "../../Pago/interfaces/PagoInterfaces";

export default interface PagoUseCasePort {
  
  verPagoPorId(idPago: number): Promise<IPagoInfo[]>;

  procesarPago(idusuario: number): Promise<IRespuestaPago>;

}
