import { Router } from 'express';
import PagoRouterExpressInterface from '../../Domain/interfaces/PagoRouterExpressInterface';
import PagoControladorExpress from '../Controller/CarritoControladorExpress';



export default class PagoRouterExpress implements PagoRouterExpressInterface {
  router: Router;
  path: string;

  constructor(private readonly pagoControlador: PagoControladorExpress) {
    this.router = Router();
    this.path = '/pago';
    this.routes();
  }

  public routes(): void {
    this.verPagoPorId();
    this.procesarPago();
  }

  public verPagoPorId(): void {
    this.router.get('/:idPago', this.pagoControlador.verPagoPorId.bind(this.pagoControlador));
  }

  public procesarPago(): void {
    this.router.post('/procesarpago', this.pagoControlador.procesarPago.bind(this.pagoControlador));
  }
}
