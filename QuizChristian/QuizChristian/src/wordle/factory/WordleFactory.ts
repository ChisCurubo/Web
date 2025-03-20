
import WordleController from "../controller/WordleController"
import WordleModel from "../model/WordleModel"
import WordleView from "../view/WordleView"


export default class WordleFactory {
  public static createWordleFactory(): WordleView {
    const wordleModel = new WordleModel()
    const wordleController = new WordleController(wordleModel)
    return new WordleView(wordleController)
  }
}
