export interface Wordle {
    word:string;
    trys: number;
    player: string;
}

export interface returnTrys {
    coincidence : number[],
    status: boolean
}