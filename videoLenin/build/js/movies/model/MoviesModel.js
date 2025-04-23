import Subject from "../../shared/types/Subject.js";
import NullMovie from "../types/NullMovie.js";
// Modelo sujeto 
export default class MoviesModel extends Subject {
    moviesData = [];
    filteredMovies = [];
    constructor() {
        super();
        this.moviesData = [NullMovie];
        this.filteredMovies = [NullMovie];
    }
    init = async () => {
        console.log('MoviesModel.init()');
        this.moviesData = await this.loadMoviesData();
        this.filteredMovies = this.moviesData;
    };
    getMoviesData = () => {
        return this.filteredMovies;
    };
    loadMoviesData = async () => {
        const res = await fetch('./database/movies-2020s.json');
        if (!res.ok) {
            return [NullMovie];
        }
        return await res.json();
    };
    searchMovies = async (search) => {
        console.log('MoviesModel.searchMovies()');
        if (search.length === 0) {
            this.filteredMovies = this.moviesData;
        }
        else {
            const searchLower = search.toLowerCase();
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
        this.notifyAll();
    };
}
