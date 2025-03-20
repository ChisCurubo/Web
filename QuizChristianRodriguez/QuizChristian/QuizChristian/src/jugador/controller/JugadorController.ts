import CoheteModel from "../model/JugadorModel";
import { Request, Response } from 'express'

export default class CoheteController{
    constructor (private readonly coheteModel: CoheteModel){}

    public getLanzamientos= async(_req: Request, res: Response):Promise<void> =>{
        res.status(200).json({launches: await this.coheteModel.getInfoApiSpaceX()})
    }

    public getImage= async(_req: Request, res: Response):Promise<void> =>{
        try{
            const respuesta:string  = await this.coheteModel.getImage();
            res.status(200).redirect(respuesta);
        }catch(error) {
            console.error("Error en getImgCohetes:", error);
            res.status(500).send("Error al obtener la imagen.");
        }
    }
    public getImageWriting= async(_req: Request, res: Response):Promise<void> =>{
        try{
            const read = await this.coheteModel.readFile();
            if(read === null){
                throw new Error("No se ha leído el archivo");
            }
            res.status(200).redirect(read.links.patch.large);

        }catch(error) {

        }

    }
}