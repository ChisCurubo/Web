import NavbarModel from '../model/NavbarModel.js'
import NavbarView from '../view/NavbarView.js'

export default class NavbarController {
  constructor(
    private readonly model: NavbarModel,
    private readonly view: NavbarView
  ) {}

  readonly init = () => {
    console.log('NavbarController.init()')
    this.model.init()
    this.view.init()
    this.view.render()
  }
}
