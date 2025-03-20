import { Request, Response } from 'express';
import ControllerExpressInterface from '../../../Express/domain/ControllerExpressInterface';

export default interface ImagenControladorExpressInterface extends ControllerExpressInterface {
  VerIamgen(req: Request, res: Response): Promise<void>;

}