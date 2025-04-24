import Subject from "../../shared/types/Subject.js"
import Movie from "../types/Movie.js"
import NullMovie from "../types/NullMovie.js"
import MoviesView from "../view/MoviesView.js"
// Modelo sujeto 

export default class MoviesModel extends Subject<MoviesView> {
  private  moviesData : Movie[] = []
  private filteredMovies: Movie[] = []
  private readonly gridSize: number = 16
  private currentPage: number = 1

  constructor(){
    super()
    this.moviesData=[NullMovie]
    this.filteredMovies = [NullMovie]
  }
  readonly init = async() => {
    console.log('MoviesModel.init()')
    this.moviesData= await this.loadMoviesData()
    this.filteredMovies = this.moviesData
  }

  readonly getMoviesData = (): Movie[] => {
    const start = (this.currentPage - 1) * this.gridSize
    const end = this.currentPage * this.gridSize
    return this.filteredMovies.slice(start, end)
  }
  

  readonly loadMoviesData = async (): Promise<Movie[]> =>{
    const res = await fetch('./database/movies-2020s.json')
    if (!res.ok){
      return [NullMovie]
    } 
    return await res.json()
  }

  readonly searchMovies = async (search: string): Promise<void> => {
    console.log('MoviesModel.searchMovies()')
    if (search.length === 0) {
      this.filteredMovies = this.moviesData
    } else {
      const searchLower = search.toLowerCase()
      this.filteredMovies = this.moviesData.filter((movie) => {
        const title = movie.title?.toLowerCase() || "";
        const year = movie.year?.toString() || "";
        const price = movie.price?.toString() || "";
        const extract = movie.extract?.toLowerCase() || "";
        const cast = Array.isArray(movie.cast) ? movie.cast.join(", ").toLowerCase() : "";
        const genres = Array.isArray(movie.genres) ? movie.genres.join(", ").toLowerCase() : "";
      
        const aws = [title, year, price, extract, cast, genres].join(" ");
        return aws.includes(searchLower);
      });
        
    }
    this.notifyAll()
    }

    readonly getSizeGrid= (): number => {
      const size = this.filteredMovies.length
      if (size === 0) return 0
      const total = Math.ceil(size / this.gridSize)
      return total
    }


    readonly nextPage = (): void => {
      const totalPages = this.getSizeGrid()
      if (this.currentPage < totalPages) {
        this.setPage(this.currentPage + 1)
      }
    }

    readonly previousPage = (): void => {
      if (this.currentPage > 1) {
        this.setPage(this.currentPage - 1)
      }
    }


    readonly setPage = (page: number): void => {
      this.currentPage = page
      this.notifyAll()
    }
    
    readonly getCurrentPage = (): number => {
      return this.currentPage
    }
    

    
    
  



}
