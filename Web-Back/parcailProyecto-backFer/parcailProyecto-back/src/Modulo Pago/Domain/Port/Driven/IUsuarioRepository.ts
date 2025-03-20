import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import { IRespuestaPago, IPagoInfo } from "../../Pago/interfaces/PagoInterfaces";

export interface IPagoRepository extends RepositoryInterface {

  verPagoPorId(idPago: number): Promise<IPagoInfo[]>;

  procesarPago(idusuario: number): Promise<IRespuestaPago>;

}
