import NavBarTemplate from "../templates/NavBarTemplate.js";
export default class NavbarView {
    navbarHTML;
    sectionChangeHandler;
    constructor(element) {
        const navbar = document.createElement(`${element}`);
        if (!navbar) {
            this.navbarHTML = document.createElement('menu');
        }
        this.navbarHTML = navbar;
    }
    init = () => {
        console.log('NavbarView.init()');
        this.render();
    };
    getNavbarHTML = () => {
        return this.navbarHTML;
    };
    render = () => {
        const templateNav = new NavBarTemplate();
        this.navbarHTML.innerHTML = templateNav.renderNavbar();
    };
    onSectionChange = (handler) => {
        this.sectionChangeHandler = handler;
        const activeButton = this.navbarHTML.querySelector('.nav-btn.active');
        const section = activeButton?.getAttribute('data-section');
        if (section) {
            this.sectionChangeHandler(section);
        }
        this.handleClick();
    };
    handleClick = () => {
        const buttons = this.navbarHTML.querySelectorAll('.nav-btn');
        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                buttons.forEach((b) => b.classList.remove('active'));
                button.classList.add('active');
                const section = button.getAttribute('data-section');
                if (section && this.sectionChangeHandler) {
                    this.sectionChangeHandler(section);
                }
            });
        });
    };
}
