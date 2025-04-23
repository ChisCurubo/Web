export default class NavbarController {
    model;
    view;
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    init = () => {
        console.log('NavbarController.init()');
        this.model.init();
        this.view.init();
        this.view.render();
    };
}
