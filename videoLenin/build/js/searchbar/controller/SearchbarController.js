export default class SearchbarController {
    model;
    view;
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    init = () => {
        console.log('SearchbarController.init()');
        this.model.init();
        this.view.init();
        this.view.render();
    };
}
