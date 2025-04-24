import Observer from "../../shared/types/Observer.js"
import MoviesModel from "../model/MoviesModel.js"
import MovieTemplate from "../templates/MovieTemplate.js"
// vista es el observador
export default class MoviesView extends Observer<MoviesModel> {
  private readonly moviesHTML: HTMLElement
  private readonly paginator: HTMLElement

  constructor(movieModel: MoviesModel, element: string) {
    super(movieModel)
    this.moviesHTML = document.createElement(`${element}`) as HTMLElement
    this.paginator = document.createElement(`paginator`) as HTMLElement
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
    const movieModel = this.subject as MoviesModel
    const moviesData = movieModel.getMoviesData()
    const templates = new MovieTemplate(moviesData)
    const gridMovies = await templates.render()
    this.moviesHTML.innerHTML = gridMovies 
    
    const button = await templates.renderButton(movieModel.getCurrentPage(), movieModel.getSizeGrid())
    this.paginator.innerHTML = button

    this.assingEvent(movieModel)
  }

  
  readonly getPaginatorHTML=(): HTMLElement=>{
    return this.paginator
  }
  
  readonly getMoviesHTML=(): HTMLElement=>{
    return this.moviesHTML
  }


  private readonly assingEvent = ( modelMovie : MoviesModel): void => {
    const prevBtn = document.querySelector('#prev-button')
    const nextBtn = document.querySelector('#next-button')
  
    prevBtn?.addEventListener('click', () => {
      modelMovie.previousPage()
    })
  
    nextBtn?.addEventListener('click', () => {
      modelMovie.nextPage()
    })
  }
  


}
