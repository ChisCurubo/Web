
import SearchbarModel from '../model/SearchbarModel.js'
import SearchbarView from '../view/SearchbarView.js'

export default class SearchbarController  {
  
  constructor(
    private readonly model: SearchbarModel,
    private readonly view: SearchbarView
  ) {}

  readonly init = () => {
    console.log('SearchbarController.init()')
    this.model.init()
    this.view.init()
    this.view.render()

  }

}
