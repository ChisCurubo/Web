import Observer from "../../shared/types/Observer.js";
import MovieTemplate from "../templates/MovieTemplate.js";
// vista es el observador
export default class MoviesView extends Observer {
    moviesHTML;
    constructor(movieModel, element) {
        super(movieModel);
        this.moviesHTML = document.createElement(`${element}`);
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
        const moviesData = this.subject.getMoviesData();
        console.log("Rendering movies:", moviesData);
        const templates = new MovieTemplate(moviesData);
        this.moviesHTML.innerHTML = await templates.render();
    };
    getMoviesHTML = () => {
        return this.moviesHTML;
    };
}
