import CoheteView from '../cohete/view/CoheteView';
import express, {Application} from 'express'
import WordleView from '../wordle/view/WordleView';

export default class Server{
    private app : Application

    constructor(private readonly coheteView: CoheteView,
        private readonly wordleView: WordleView
    ){
        this.app = express();
        this.routes();
    }

    public routes(){
        this.app.use('/', this.coheteView.router);
        this.app.use('/', this.wordleView.router);
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