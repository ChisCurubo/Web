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
    await this.view.render()
  }

  readonly searchMovies = async (search: string): Promise<void> => {
    await this.model.searchMovies(search)
  }

  readonly getGridSize = (): number => {
    return this.model.getSizeGrid()
  }

  readonly nextPage = (): void => {
    const totalPages = this.model.getSizeGrid()
    const current = this.model.getCurrentPage()
    if (current < totalPages) {
      this.model.setPage(current + 1)
    }
  }
  
  readonly previousPage = (): void => {
    const current = this.model.getCurrentPage()
    if (current > 1) {
      this.model.setPage(current - 1)
    }
  }

  readonly getPaginatorHTML = (): HTMLElement => {
    return this.view.getPaginatorHTML()
  }

  readonly getMoviesHTML = (): HTMLElement => {
    return this.view.getMoviesHTML()
  }
  

}
