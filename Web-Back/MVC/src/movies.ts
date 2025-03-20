import CoheteFactory from './cohete/factory/Cohetefactory';
import Server from './express/Server'
import MovieFactory from './movie/factory/MovieFactory'
import ProductoFactory from './producto/factory/ProductoFactory';
import UserFactory from './userLI/factory/UserFactory'

const movieView = MovieFactory.createMovieView();

const userView = UserFactory.createUserView();

const productoView = ProductoFactory.createProductoView();
const CoheteView = CoheteFactory.createCoheteView()

const server = new Server(movieView, userView,productoView, CoheteView)
server.start()
