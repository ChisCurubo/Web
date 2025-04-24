export default class MoviesController {
    model;
    view;
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    init = async () => {
        console.log('MoviesController.init()');
        await this.model.init();
        this.view.init();
        this.view.render();
    };
    searchMovies = async (search) => {
        await this.model.searchMovies(search);
    };
    getGridSize = () => {
        return this.model.getSizeGrid();
    };
    nextPage = () => {
        const totalPages = this.model.getSizeGrid();
        const current = this.model.getCurrentPage();
        if (current < totalPages) {
            this.model.setPage(current + 1);
        }
    };
    previousPage = () => {
        const current = this.model.getCurrentPage();
        if (current > 1) {
            this.model.setPage(current - 1);
        }
    };
}
