import CoheteController from "../controller/CoheteController"
import CoheteModel from "../model/CoheteModel"
import CoheteView from "../view/CoheteView"

export default class CoheteFactory {
  public static createCoheteView(): CoheteView {
    const coheteModel = new CoheteModel()
    const coheteController = new CoheteController(coheteModel)
    return new CoheteView(coheteController)
  }
}
