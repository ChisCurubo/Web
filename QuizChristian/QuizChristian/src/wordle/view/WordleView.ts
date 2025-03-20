import { Router } from 'express';
import WordleController from '../controller/WordleController';


export default class WordleView{
    router: Router

    constructor(private readonly controller: WordleController) {
        this.router = Router()
        this.routes()
    }
    public routes(): void{
        this.router.get(
            '/api/v1.0/wordle/start',
            this.controller.startGame.bind(this.controller)
        );
        this.router.get(
            '/api/v1.0/wordle/start/play/:word',
            this.controller.playGanme.bind(this.controller)
        )
    }
}