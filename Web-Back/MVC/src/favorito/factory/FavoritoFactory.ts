import MovieController from '../controller/FavoritoController'
import MovieModel from '../model/FavoritoModel'
import MovieView from '../view/FavoritoView'

export default class MovieFactory {
  public static createMovieView(): MovieView {
    const movieModel = new MovieModel()
    const movieController = new MovieController(movieModel)
    return new MovieView(movieController)
  }
}
