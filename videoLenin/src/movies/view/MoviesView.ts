import Observer from "../../shared/types/Observer.js"
import MoviesModel from "../model/MoviesModel.js"
import MovieTemplate from "../templates/MovieTemplate.js"
// vista es el observador
export default class MoviesView extends Observer<MoviesModel> {
  private readonly moviesHTML: HTMLElement

  constructor(movieModel: MoviesModel, element: string) {
    super(movieModel)
    this.moviesHTML = document.createElement(`${element}`) as HTMLElement
    this.moviesHTML.classList.add('movies')
  }

  readonly init = (): void => {
    console.log('MoviesView.init()')
  }

  readonly update = (): void => {
    console.log("Movies View updated")
    this.render()
  }
  readonly render = async (): Promise<void> => {
    const moviesData = (this.subject as MoviesModel).getMoviesData() 
    console.log("Rendering movies:", moviesData)
    const templates = new MovieTemplate(moviesData)
    this.moviesHTML.innerHTML = await templates.render()
  }

  
  readonly getMoviesHTML=(): HTMLElement=>{
    return this.moviesHTML
  }
}
