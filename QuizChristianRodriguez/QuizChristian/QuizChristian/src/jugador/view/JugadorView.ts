import { Router } from 'express';
import CoheteController from "../controller/JugadorController";


export default class CoheteView{
    router: Router

    constructor(private readonly controller: CoheteController) {
        this.router = Router()
        this.routes()
    }
    public routes(): void{
        this.router.get(
            '/api/v1.0/cohete/lanzamientos',
            this.controller.getLanzamientos.bind(this.controller)
        );
        this.router.get(
            '/api/v1.0/cohete/lanzamientos/imagen',
            this.controller.getImage.bind(this.controller)
        )
        this.router.get(
            '/api/v1.0/cohete/lanzamientos/imagenFile',
            this.controller.getImageWriting.bind(this.controller)
        )
    }
}