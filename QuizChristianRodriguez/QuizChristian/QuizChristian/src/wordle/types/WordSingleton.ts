import { Wordle } from "./Interface/Wordle";

export class WordleSingleton {
    private static instance: WordleSingleton;
    private wordleData: Wordle;


    private constructor() {
        this.wordleData = {
            word: '',
            trys: 0,
            player: '',
        };
    }

    public static getInstance(): WordleSingleton {
        if (!WordleSingleton.instance) {
            WordleSingleton.instance = new WordleSingleton();
        }
        return WordleSingleton.instance;
    }

    public initialize(data: Wordle): void {
        this.wordleData = data;
    }


    public getWordleData(): Wordle {
        return this.wordleData;
    }

    public setWord(word: string): void {
        this.wordleData.word = word;
    }

    public setTrys(trys: number): void {
        this.wordleData.trys = trys;
    }

    public setPlayer(player: string): void {
        this.wordleData.player = player;
    }

    // public addLetter(letter: string): void {
    //     if (!this.wordleData.letters.includes(letter)) {
    //         this.wordleData.letters.push(letter);
    //     }
    // }

    // // public validateWord(letter: string): boolean {
    // //     if(this.wordleData.word.includes(letter)){
    // //         for (let i = 0; i < this.wordleData.word.length; i++) {
                
                
    // //         }
    // //     }
    // // }

    // public resetLetters(): void {
    //     this.wordleData.letters = [];
    // }
}
