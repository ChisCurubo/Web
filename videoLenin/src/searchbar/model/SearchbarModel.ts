
import Subject from "../../shared/types/Subject.js"
import SearchbarView from "../view/SearchbarView.js"

export default class SearchbarModel extends Subject<SearchbarView> {
  private searchbarData: string = ''

  constructor() {
    super()
    this.searchbarData = ''
  }
  readonly init = () => {
    console.log('SearchbarModel.init()')
  }

  readonly getSearchbarData = (): string => {
    return this.searchbarData
  }
  readonly setSearchbarData  = (searchbarData: string): void => {
    this.searchbarData = searchbarData
    this.notifyAll()
  }
}
