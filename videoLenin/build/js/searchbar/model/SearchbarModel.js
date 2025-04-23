import Subject from "../../shared/types/Subject.js";
export default class SearchbarModel extends Subject {
    searchbarData = '';
    constructor() {
        super();
        this.searchbarData = '';
    }
    init = () => {
        console.log('SearchbarModel.init()');
    };
    getSearchbarData = () => {
        return this.searchbarData;
    };
    setSearchbarData = (searchbarData) => {
        this.searchbarData = searchbarData;
        this.notifyAll();
    };
}
