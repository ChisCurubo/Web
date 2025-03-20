
import CuatroRayaController from "../controller/CuatroRayaController"
import CuatroRayaModel from "../model/CuatroRayaModel"
import CuatroRayaView from "../view/CuatroRayaView"


export default class CuatroRayaFactory {
  public static createCuatroRayaView(): CuatroRayaView {
    const cuatroRayaModel = new CuatroRayaModel()
    const cuatroRayaController = new CuatroRayaController(cuatroRayaModel)
    return new CuatroRayaView(cuatroRayaController)
  }
}
