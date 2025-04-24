import MoviesController from './controller/MoviesController.js'
import MoviesModel from './model/MoviesModel.js'
import MoviesView from './view/MoviesView.js'

export default class Movies {
  private readonly model: MoviesModel
  private readonly view: MoviesView
  private readonly controller: MoviesController

  constructor(element: string) {
    this.model = new MoviesModel()
    this.view = new MoviesView(this.model, element )
    this.controller = new MoviesController(this.model, this.view)
    this.model.attach(this.view)
  }

  readonly init = async ():Promise<void> => {
    await this.controller.init()
  }

  readonly getMoviesHTML = (): HTMLElement => {
    return this.view.getMoviesHTML()
  }
  readonly getMoviesModel = (): MoviesModel => {
    return this.model
  }

  readonly getToNextPage = (): void => {
    this.controller.nextPage()
  }
  
  readonly getToPreviousPage = (): void => {
    this.controller.previousPage()
  }
  

  readonly searchMovies = async (search: string): Promise<void> => {
    await this.controller.searchMovies(search)
  }
}
