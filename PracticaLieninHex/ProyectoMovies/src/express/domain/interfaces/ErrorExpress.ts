
import { Request, Response } from 'express'
import ControllerExpress from './ContollerExpress'

export default interface ErrorExpress
  extends ControllerExpress {
  error: (_req: Request, res: Response) => void
}
