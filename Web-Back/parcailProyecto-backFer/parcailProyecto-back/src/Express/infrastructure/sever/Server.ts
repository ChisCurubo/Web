import express, { Application } from 'express';
import https from 'https';
import fs from 'fs';
import ExpressProvider from '../provider/ExpressProvider';
import RouterExpressInterface from '../../domain/RouterExpressInterface';
import ErrorRouterExpressInterface from '../error/router/ErrorExpressRouter';

export default class Server {
  private readonly app: Application;

  constructor(
    private readonly routesExpress: RouterExpressInterface[],
    private readonly error: ErrorRouterExpressInterface
  ) {
    this.app = express();
    this.configure();
    this.routes();
  }

  public routes() {
    this.routesExpress.forEach((route) => {
      this.app.use(route.path, route.router);
    });

    this.app.use(this.error.path, this.error.router);
  }

  public configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public start() {
    const HOST = ExpressProvider.getHost();
    const PORT = ExpressProvider.getPort();
    const PROTOCOL = ExpressProvider.getProtocol();

    // Cargar los certificados desde la ruta correcta
    const options = {
      key: fs.readFileSync('C:/Users/cpsab/Desktop/Nueva carpeta (5)/parcailProyecto-back/certificates/buenavida-key.pem'),
      cert: fs.readFileSync('C:/Users/cpsab/Desktop/Nueva carpeta (5)/parcailProyecto-back/certificates/buenavida-cert.pem'),
    };

    // Crear el servidor HTTPS
    https.createServer(options, this.app).listen(PORT, () =>
      console.log(`Server is running on ${PROTOCOL}://${HOST}:${PORT}`)
    );
  }
}