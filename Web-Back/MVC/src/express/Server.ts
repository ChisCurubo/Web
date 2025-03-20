import express, { Application } from 'express'
import * as https from 'https';
import * as fs from 'fs';
import MovieView from '../movie/view/MovieView'
import Environment from '../shared/Environment'
import UserView from '../userLI/view/UserView'
import Database from '../shared/database/database';
import ProductoView from '../producto/view/ProductoView';
import CoheteView from '../cohete/view/CoheteView';


export default class Server {
  private readonly app: Application

  constructor(
    private readonly movieView: MovieView,
    private readonly userView: UserView,
    private readonly productoView: ProductoView,
    private readonly coheteView: CoheteView
  ) {
    this.app = express()
    this.configure()
    this.routes()
  }

  

  public routes() {
    this.app.use('/api/v1.0/movies', this.movieView.router)
    this.app.use('/api/v1.0/users', this.userView.router)
    this.app.use('/api/v1.0/productos', this.productoView.router)
    this.app.use('/api/v1.0/cohete', this.coheteView.router)
  }

  public configure() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  public async start() {
    const HOST = Environment.getHost();
    const PORT = Environment.getPort();
    const PROTOCOL = Environment.getProtocol();

    // Inicializar la conexión a la base de datos
    try {
      await Database.getConnection();
      console.log('Base de datos inicializada correctamente');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      process.exit(1); // Finaliza el servidor si no puede conectar a la base de datos
    }

    // Si es https hace lo del if
    if(PROTOCOL === 'https'){
      const keyPath = Environment.getCertKey(); // Ruta al archivo key.pem
      const certPath = Environment.getCertPem(); // Ruta al archivo cert.pem
      const options = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      };
      https.createServer(options, this.app).listen(PORT, () =>
        console.log(`Server is running on ${PROTOCOL}://${HOST}:${PORT}`)
      );
    }else {
      this.app.listen(PORT, () =>
        console.log(`Server is running on ${PROTOCOL}://${HOST}:${PORT}`)
      );
    }

  }
}
