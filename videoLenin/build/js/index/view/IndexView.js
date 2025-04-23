import Movies from "../../movies/Movies.js";
import Navbar from "../../navbar/Navbar.js";
import Searchbar from "../../searchbar/Searchbar.js";
export default class IndexView {
    main;
    navbar;
    searchBar;
    movies;
    constructor() {
        const main = document.querySelector('.container');
        if (!main) {
            this.main = document.createElement('.container');
        }
        this.movies = new Movies("movies");
        this.navbar = new Navbar("navbar");
        this.searchBar = new Searchbar("searchbar", async (search) => await this.searchMovies(search));
        this.main = main;
    }
    init = () => {
        console.log('IndexView.init()');
        this.createNavbar();
    };
    getIndexHTML = () => {
        return this.main;
    };
    render = () => { };
    createNavbar = () => {
        this.navbar.init();
        const navbarHTML = this.navbar.getNavbarHTML();
        const div = document.querySelector('.nav-btn-left');
        div.appendChild(navbarHTML);
        this.navbar.onSectionChange((section) => this.pageLoader(section));
    };
    pageLoader = (section) => {
        const page = document.querySelector('main');
        page.innerHTML = '';
        switch (section) {
            case 'home':
                page.innerHTML = '<h1>Home section coming soon</h1>';
                break;
            case 'rentals':
                this.createMovies();
                this.createSearchBar();
                break;
            case 'about':
                page.innerHTML = '<h1>About us</h1>';
                break;
            default:
                page.innerHTML = '<h1>404 - Section not found</h1>';
        }
    };
    createSearchBar = () => {
        this.searchBar.init();
        const searchbarHTML = this.searchBar.getSearchbarHTML();
        const div = document.querySelector('.nav-btn-right');
        div.appendChild(searchbarHTML);
    };
    createMovies = () => {
        this.movies.init();
        const moviesHTML = this.movies.getMoviesHTML();
        const mainDiv = document.querySelector('main');
        mainDiv.appendChild(moviesHTML);
    };
    searchMovies = async (search) => {
        this.movies.searchMovies(search);
    };
}
