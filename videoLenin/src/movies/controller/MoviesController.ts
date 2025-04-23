import MoviesModel from '../model/MoviesModel.js'
import MoviesView from '../view/MoviesView.js'

export default class MoviesController {
  constructor(
    private readonly model: MoviesModel,
    private readonly view: MoviesView
  ) {}

  readonly init = async(): Promise<void> => {
    console.log('MoviesController.init()')
    await this.model.init()
    this.view.init()
    this.view.render()
  }

  readonly searchMovies = async (search: string): Promise<void> => {
    await this.model.searchMovies(search)
  }

}
