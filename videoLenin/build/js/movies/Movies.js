import MoviesController from './controller/MoviesController.js';
import MoviesModel from './model/MoviesModel.js';
import MoviesView from './view/MoviesView.js';
export default class Movies {
    model;
    view;
    controller;
    constructor(element) {
        this.model = new MoviesModel();
        this.view = new MoviesView(this.model, element);
        this.controller = new MoviesController(this.model, this.view);
        this.model.attach(this.view);
    }
    init = async () => {
        await this.controller.init();
    };
    getMoviesHTML = () => {
        return this.view.getMoviesHTML();
    };
    getPaginatorHTML = () => {
        return this.view.getPaginatorHTML();
    };
    getMoviesModel = () => {
        return this.model;
    };
    getToNextPage = () => {
        this.controller.nextPage();
    };
    getToPreviousPage = () => {
        this.controller.previousPage();
    };
    searchMovies = async (search) => {
        await this.controller.searchMovies(search);
    };
}
