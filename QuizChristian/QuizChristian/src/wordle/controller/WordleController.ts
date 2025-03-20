import WordleModel from "../model/WordleModel";
import { Request, Response } from 'express'
import { returnTrys } from "../types/Interface/Wordle";

export default class WordleController{
    constructor (private readonly WordleModel: WordleModel){}

    public startGame(_req: Request, res: Response): void{
        try{
            const response = this.WordleModel.getWord();
            res.status(200).json({word: response});
        }catch(error){
            console.error("Error en startGame:", error);
            res.status(500).send("Error al iniciar el juego.");
        }
    }
    public playGanme(req: Request, res: Response): void{
        try{
            const word = req.params['word'];
            if(word){
                const response: returnTrys = this.WordleModel.playWordle(word);
                res.status(200).json({word: response});
            }
            else{
                res.status(400).json({ message: "Perdio ya paila.", data: null });
            }
          
        }catch(error){
            console.error("Error en startGame:", error);
            res.status(500).send("Error al iniciar el juego.");
        }

    }
    
}