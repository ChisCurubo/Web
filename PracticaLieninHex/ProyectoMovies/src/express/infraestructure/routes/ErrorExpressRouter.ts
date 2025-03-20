import { Router } from 'express'
import ErrorExpress from '../../domain/interfaces/ErrorExpress'
import RoutesExpress from '../../domain/interfaces/RoutesExpress'

export default class ErrorRouterExpressInterface
  implements RoutesExpress
{
  router: Router
  path: string

  constructor(
    private readonly errorController: ErrorExpress
  ) {
    this.router = Router()
    this.path = '*'
    this.routes()
  }

  public routes() {
    this.router.use('*', this.errorController.error.bind(this.errorController))
  }
}
