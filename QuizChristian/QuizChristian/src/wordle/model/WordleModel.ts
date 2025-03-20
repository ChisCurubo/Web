
import { returnTrys, Wordle } from "../types/Interface/Wordle";


export default class WordleModel {
    private wordCap: Wordle = {
        word:'wordle',
        trys: 5,
        player: ''
    };
     

    public playWordle( word :string): returnTrys{
        let coincidence = new Array(this.wordCap.word.length).fill(0);

        if(this.wordCap.word === word){
            coincidence.fill(2);
            return { coincidence, status: this.statusWin(word) } as returnTrys;
        }
        this.wordCap.trys--;

        for (let i = 0; i < this.wordCap.word.length; i++) {
            if(this.wordCap.word.charAt(i) === word.charAt(i)){
                coincidence[i]= 2;
            }else if(this.wordCap.word.includes(word.charAt(i))){
                coincidence[i]= 1;
            }    
        }
        return { coincidence, status: this.statusWin(word) } as returnTrys;
    }

    private statusWin(word : string): boolean{
        return this.wordCap.word === word; 
    }

    public getWord(): number{
        return Number(this.wordCap.word.length);
    }
}