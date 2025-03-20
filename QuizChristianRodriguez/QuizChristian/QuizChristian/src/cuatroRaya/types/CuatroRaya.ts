export interface Tablero{
    tablero: string [][]
    status: boolean
}
export default class TableroClass{
    private static tablero: TableroClass;
    private readonly columnas: number = 7;
    private readonly filas: number= 6;
    public turno: number;
    public board: string[][];
    
    private constructor(){
        this.board = this.startBoard();
        this.turno = 1;
    }

    public static getInstance(): TableroClass{
        if(TableroClass.tablero === null || TableroClass.tablero === undefined){
            TableroClass.tablero = new TableroClass();
        }
        return TableroClass.tablero;
    }

    public getTurno(): string{
        return (this.turno++) % 2 === 0 ? 'X' : 'O';
    }

    public getBoard(): string[][]{
        return this.board;
    }

    public getFilas(): number{
        return this.filas;
    }

    public getColumnas(): number{
        return this.columnas;
    }

    private startBoard(): string[][]{
        let board: string[][] = new Array();
        for (let f = 0; f < this.filas; f++){
            for (let c = 0; c < this.columnas; c++ ){
                board[f]?.push(" ");
            }
        }
        return board;
    }
}