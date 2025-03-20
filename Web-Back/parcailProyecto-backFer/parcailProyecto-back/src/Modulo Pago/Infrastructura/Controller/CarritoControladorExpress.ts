import { Request, Response } from 'express';
import PagoUseCasePort from '../../Domain/Port/Driver/PagoUseCasePort';

export default class PagoControladorExpress {
  constructor(private readonly pagoCasoUso: PagoUseCasePort) {}

  async verPagoPorId(req: Request, res: Response): Promise<void> {
    const { idPago } = req.params;

    if (!idPago || isNaN(Number(idPago))) {
      res.status(400).json({ mensaje: "ID de pago inválido" });
      return;
    }

    const pagos = await this.pagoCasoUso.verPagoPorId(Number(idPago));

    // Verificación para evitar acceso a `undefined`
    if (pagos.length === 0 || (pagos[0] && pagos[0].idPago === 0)) {
      res.status(404).json({ mensaje: "Pago no encontrado" });
      return;
    }

    res.status(200).json(pagos);
  }

  async procesarPago(req: Request, res: Response): Promise<void> {
    const { idUsuario } = req.body;
    
    console.log("ID Usuario recibido:", idUsuario); // ✅ Verifica el valor recibido
    
   
    try {
      const resultado = await this.pagoCasoUso.procesarPago(idUsuario);
  
      if (resultado) {
        res.status(201).json({
          mensaje: "Pago procesado correctamente",
          pago: resultado
        });
      } else {
        res.status(404).json({ mensaje: "No se encontró información del pago." });
      }
    } catch (error) {
      console.error("Error al procesar pago:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }
  
}
