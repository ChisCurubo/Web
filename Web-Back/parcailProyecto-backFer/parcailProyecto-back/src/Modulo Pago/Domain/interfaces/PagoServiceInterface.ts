import { IPagoInfo, IRespuestaPago } from "../Pago/interfaces/PagoInterfaces";

export default interface PagoServiceInterface {
  verPagoPorId(idPago: number): Promise<IPagoInfo[] >;

  procesarPago(idusuario: number): Promise<IRespuestaPago>;
}
