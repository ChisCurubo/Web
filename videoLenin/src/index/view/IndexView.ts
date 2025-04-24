import Movies from "../../movies/Movies.js"
import Navbar from "../../navbar/Navbar.js"
import Searchbar from "../../searchbar/Searchbar.js"

export default class IndexView {
  private readonly main: HTMLElement
  private readonly navbar: Navbar
  private readonly searchBar:Searchbar
  private readonly movies: Movies

  constructor() {
    const main = document.querySelector('.container') as HTMLElement
    if(!main){
      this.main = document.createElement('.container') 
    }
    
    this.movies = new Movies("movies")
    this.navbar = new Navbar("navbar")
    this.searchBar = new Searchbar("searchbar", async (search: string) => await this.searchMovies(search))
    
    this.main= main
  }

  readonly init = () => {
    console.log('IndexView.init()')
    this.createNavbar()
  }

  readonly getIndexHTML = (): HTMLElement => {
    return this.main
  }

  readonly render = () => {}

  readonly createNavbar = () => {
    this.navbar.init()
    const navbarHTML = this.navbar.getNavbarHTML()
    const div = document.querySelector('.nav-btn-left') as HTMLElement
    div.appendChild(navbarHTML)
    this.navbar.onSectionChange((section: string) => this.pageLoader(section))
    
  }
  readonly pageLoader =(section: string): void => {
    const page = document.querySelector('main') as HTMLElement
    page.innerHTML = ''
    switch (section){
      case 'home':
        page.innerHTML = '<h1>Home section coming soon</h1>'
      break
      case 'rentals':
        this.createMovies()
        this.createSearchBar()
      break
      case 'about':
        page.innerHTML = '<h1>About us</h1>'
        break
      default:
        page.innerHTML = '<h1>404 - Section not found</h1>'
    }
  }


  readonly createSearchBar = () => {
    this.searchBar.init()
    const searchbarHTML = this.searchBar.getSearchbarHTML()
    const div = document.querySelector('.nav-btn-right') as HTMLElement
    div.appendChild(searchbarHTML)
  }
  
  readonly createMovies = () => {
    this.movies.init()
    const moviesHTML = this.movies.getMoviesHTML()
    const paginatorHTML = this.movies.getPaginatorHTML()
    const mainDiv = document.querySelector('main') as HTMLElement
    mainDiv.appendChild(moviesHTML)
    mainDiv.appendChild(paginatorHTML)
  }

  readonly searchMovies = async(search: string): Promise<void> => {
    this.movies.searchMovies(search)
  }

}
