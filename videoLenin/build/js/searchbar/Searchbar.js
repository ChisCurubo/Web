import SearchbarController from './controller/SearchbarController.js';
import SearchbarModel from './model/SearchbarModel.js';
import SearchbarView from './view/SearchbarView.js';
export default class Searchbar {
    model;
    view;
    controller;
    constructor(searchbar, searchMovie) {
        this.model = new SearchbarModel();
        this.view = new SearchbarView(this.model, searchbar, searchMovie);
        this.controller = new SearchbarController(this.model, this.view);
    }
    init = () => {
        this.controller.init();
    };
    getSearchbarHTML = () => {
        return this.view.getSearchbarHTML();
    };
}
