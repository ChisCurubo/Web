import CuatroRayaModel from "../model/CuatroRayaModel";

import { Request, Response } from 'express'

export default class CuatroRayaController{
    constructor (private readonly cuatroRayaModel: CuatroRayaModel){}

    public initGame= async(_req: Request, res: Response):Promise<void> =>{
        res.status(200).json({tablero: this.cuatroRayaModel.initGame() , message: 'El jeugo se ha incializado'})
    }

    public playGame= async(req: Request, res: Response):Promise<void> =>{
        const ficha = req.body['ficha'];
        const x = req.body['x'];
        const y = req.body['y']
        if (ficha && x && y){
            res.status(200).json({tablero: this.cuatroRayaModel.playGame(ficha, Number(x), Number(y))})
        }else{
            res.status(500).json({message: 'Error en la pasada de atributos'})
        }
    }

}