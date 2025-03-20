import PagoServiceInterface from "../Domain/interfaces/PagoServiceInterface";
import { IPagoInfo, IRespuestaPago } from "../Domain/Pago/interfaces/PagoInterfaces";
import NullPago from "../Domain/Pago/NullPago";
import PagoUseCasePort from "../Domain/Port/Driver/PagoUseCasePort";


export default class PagoUseCase implements PagoUseCasePort {
  constructor(private readonly pagoService: PagoServiceInterface) {}

  public async verPagoPorId(idPago: number): Promise<IPagoInfo[]> {
    if (!idPago || idPago <= 0) {
      return [new NullPago().toInfo()];
    }

    const pago = await this.pagoService.verPagoPorId(idPago);
    if (!pago || pago.length === 0) {
      return [new NullPago().toInfo()];
    }

    return pago;
  }

  public async procesarPago(idusuario: number): Promise<IRespuestaPago> {
    if (!idusuario ) {
      return new NullPago().toInfomessege();
    }

    return await this.pagoService.procesarPago(idusuario);
  }
}
