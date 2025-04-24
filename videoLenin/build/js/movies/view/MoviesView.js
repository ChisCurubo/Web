import Observer from "../../shared/types/Observer.js";
import MovieTemplate from "../templates/MovieTemplate.js";
// vista es el observador
export default class MoviesView extends Observer {
    moviesHTML;
    paginator;
    constructor(movieModel, element) {
        super(movieModel);
        this.moviesHTML = document.createElement(`${element}`);
        this.paginator = document.createElement(`paginator`);
        this.moviesHTML.classList.add('movies');
    }
    init = () => {
        console.log('MoviesView.init()');
    };
    update = () => {
        console.log("Movies View updated");
        this.render();
    };
    render = async () => {
        const movieModel = this.subject;
        const moviesData = movieModel.getMoviesData();
        const templates = new MovieTemplate(moviesData);
        const gridMovies = await templates.render();
        this.moviesHTML.innerHTML = gridMovies;
        const button = await templates.renderButton(movieModel.getCurrentPage(), movieModel.getSizeGrid());
        this.paginator.innerHTML = button;
        this.assingEvent(movieModel);
    };
    getPaginatorHTML = () => {
        return this.paginator;
    };
    getMoviesHTML = () => {
        return this.moviesHTML;
    };
    assingEvent = (modelMovie) => {
        const prevBtn = document.querySelector('#prev-button');
        const nextBtn = document.querySelector('#next-button');
        prevBtn?.addEventListener('click', () => {
            modelMovie.previousPage();
        });
        nextBtn?.addEventListener('click', () => {
            modelMovie.nextPage();
        });
    };
}
