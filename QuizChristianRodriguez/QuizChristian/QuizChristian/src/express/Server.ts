
import express, {Application} from 'express'
import CuatroRayaView from '../cuatroRaya/view/CuatroRayaView';

export default class Server{
    private app : Application

    constructor(private readonly cuatrorayaView: CuatroRayaView,
    ){
        this.app = express();
        this.routes();
    }

    public routes(){
        this.app.use('/', this.cuatrorayaView.router);
    }

    public start(){
        const host = process.env['HOST'] ?? 'localhost';
        const port = process.env['PORT'] ?? '3000';
        const protocol = process.env['PROTOCOL'] ?? 'http';
        this.app.listen(
            port,
            ()=> console.log(`Server Starting ${protocol}://${host}:${port}`)
            
        );
        
    }
}