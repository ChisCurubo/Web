import Observer from "../../shared/types/Observer.js";
import SearchbarTemplate from "../templates/SearchBarTemplate.js";
export default class SearchbarView extends Observer {
    searchMoviesFn;
    searchbarHTML;
    constructor(searchbarModel, element, searchMoviesFn) {
        super(searchbarModel);
        this.searchMoviesFn = searchMoviesFn;
        const searchbar = document.createElement(`${element}`);
        this.searchbarHTML = searchbar;
    }
    init = () => {
        console.log('SearchbarView.init()');
        this.searchbarHTML.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.searchMovies();
        });
    };
    update = () => {
        console.log("Searchbar View updated");
        this.render();
    };
    getSearchbarHTML = () => {
        return this.searchbarHTML;
    };
    render = async () => {
        const searchbarData = this.subject.getSearchbarData();
        const templates = new SearchbarTemplate();
        this.searchbarHTML.innerHTML = await templates.renderSearch(searchbarData);
    };
    searchMovies = async () => {
        const input = this.searchbarHTML.querySelector('input');
        const search = input.value;
        await this.searchMoviesFn(search);
        input.value = '';
    };
}
