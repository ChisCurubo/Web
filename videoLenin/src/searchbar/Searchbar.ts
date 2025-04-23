

import SearchbarController from './controller/SearchbarController.js'
import SearchbarModel from './model/SearchbarModel.js'
import SearchbarView from './view/SearchbarView.js'

export default class Searchbar {
  private readonly model: SearchbarModel
  private readonly view: SearchbarView
  private readonly controller: SearchbarController


  constructor( searchbar : string, searchMovie:(search: string)=> Promise<void>) {
    this.model = new SearchbarModel()
    this.view = new SearchbarView(this.model, searchbar , searchMovie)
    this.controller = new SearchbarController(this.model, this.view)
  }

  readonly init = () => {
    this.controller.init()
  }

  readonly getSearchbarHTML = (): HTMLElement => {
    return this.view.getSearchbarHTML()
  }
}
