import UsuarioController from "../controller/UsuarioController";
import UsuarioModel from "../model/UsuarioModel";
import UsuarioView from "../view/UsuarioView";


export default class UsuarioFactory {
  public static createUsuarioView(): UsuarioView {
    const usuarioModel = new UsuarioModel()
    const usuarioController = new UsuarioController(usuarioModel)
    return new UsuarioView(usuarioController); 
  }
}
