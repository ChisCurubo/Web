import Observer from "../../shared/types/Observer.js"
import SearchbarModel from "../model/SearchbarModel.js"
import SearchbarTemplate from "../templates/SearchBarTemplate.js"

export default class SearchbarView extends Observer<SearchbarModel> {
  private readonly searchbarHTML: HTMLElement

  constructor(searchbarModel: SearchbarModel, element: string,  readonly searchMoviesFn: (search: string) => Promise<void>) {
    super(searchbarModel)
    const searchbar =  document.createElement(`${element}`) as HTMLElement
    this.searchbarHTML = searchbar

  }

  readonly init = () => {
    console.log('SearchbarView.init()')

    this.searchbarHTML.addEventListener('submit', async (e) => {
      e.preventDefault() 
      await this.searchMovies()
    })

  }

  readonly update= () :void => {
    console.log("Searchbar View updated")
    this.render()
  }

  readonly getSearchbarHTML = (): HTMLElement => {
    return this.searchbarHTML
  }

  readonly render = async() => {
    const searchbarData = (this.subject as SearchbarModel).getSearchbarData()
    const templates =  new SearchbarTemplate()
    this.searchbarHTML.innerHTML = await templates.renderSearch(searchbarData)
  }

  readonly searchMovies = async (): Promise<void> => {
    const input = this.searchbarHTML.querySelector('input') as HTMLInputElement
    const search = input.value 

    await this.searchMoviesFn(search)
    input.value = ''

  }

}
