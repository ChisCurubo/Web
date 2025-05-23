import { Request, Response } from 'express'
import ErrorExpressControllerInterface from '../../domain/interfaces/ErrorExpress'

export default class ErrorExpressController
  implements ErrorExpressControllerInterface
{
  public error = (_req: Request, res: Response): void => {
    res.status(400).json({ error: 'Path not found' })
  }
}
