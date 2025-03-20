import CoheteController from "../controller/JugadorController"
import CoheteModel from "../model/JugadorModel"
import CoheteView from "../view/JugadorView"

export default class CoheteFactory {
  public static createCoheteView(): CoheteView {
    const coheteModel = new CoheteModel()
    const coheteController = new CoheteController(coheteModel)
    return new CoheteView(coheteController)
  }
}
