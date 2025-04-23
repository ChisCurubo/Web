import Subject from "../../shared/types/Subject.js"
import Movie from "../types/Movie.js"
import NullMovie from "../types/NullMovie.js"
import MoviesView from "../view/MoviesView.js"
// Modelo sujeto 

export default class MoviesModel extends Subject<MoviesView> {
  private  moviesData : Movie[] = []
  private filteredMovies: Movie[] = []

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
    return this.filteredMovies
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
  
  



}
