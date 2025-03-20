import { Router } from 'express';
import CoheteController from "../controller/CuatroRayaController";
import CuatroRayaController from '../controller/CuatroRayaController';


export default class CuatroRayaView{
    router: Router

    constructor(private readonly controller: CuatroRayaController) {
        this.router = Router()
        this.routes()
    }
    public routes(): void{
        this.router.get(
            '/api/v1.0/4raya/init',
            this.controller.initGame.bind(this.controller)
        );
        this.router.post(
            '/api/v1.0/4raya/init/play',
            this.controller.playGame.bind(this.controller)
        )
    }
}