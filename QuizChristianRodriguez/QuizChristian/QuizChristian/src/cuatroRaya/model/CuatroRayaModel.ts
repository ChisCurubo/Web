import tableroClass, { Tablero } from "../types/CuatroRaya";


export default class CuatroRayaModel{


    public initGame (): string[][]{
        tableroClass.getInstance();
        return tableroClass.getInstance().getBoard();
    }

    public playGame(ficha: string, x: number, y: number): Tablero {
        if (this.tableroJuego.board[x][y] === '') {
            this.tableroJuego.tablero[x][y] = ficha;
            this.tableroJuego.status = this.checkWin();
            return this.tableroJuego;
        }
        throw new Error("Invalid move: Position is already occupied.");
    }

    private checkWin(): boolean {
        return (
            this.checkWinHorizontal() ||
            this.checkWinVertical() ||
            this.checkWinDiagonal()
        );
    }


    private checkWinHorizontal(): boolean {
        let count = 1;
        for (let f = 0; f < tableroClass.getInstance().getFilas(); f++) {
            for (let c = 1; c <  tableroClass.getInstance().getColumnas(); c++) {
                if(count === 4){
                    return true;
                }
                if(tableroClass.getInstance().getBoard()[f][c] === tableroClass.getInstance().getBoard()[f][c-1]){
                    count++;
                }
            }
            
        }
        return false;
    }

    private checkWinVertical(): boolean {
        let count = 1;
        for (let f = 1; f < tableroClass.getInstance().getFilas(); f++) {
            for (let c = 0; c <  tableroClass.getInstance().getColumnas(); c++) {
                if(count === 4){
                    return true;
                }
                if( tableroClass.getInstance().getBoard()[f][c] === tableroClass.getInstance().getBoard()[f-1][c]){
                    count++;
                }
            }
            
        }
        return false;
    }

    private checkWinDiagonal(): boolean {
        let count = 0;
        for (let f = 0; f < (tableroClass.getInstance().getFilas() - 1); f++) {
            for (let c = 0; c <  (tableroClass.getInstance().getColumnas()- 1); c++) {
                if(count === 4){
                    return true;
                }
                if(tableroClass.getInstance().getBoard()[f][c] === tableroClass.getInstance().getBoard()[f+1][c+1]){
                    count++;
                }
            }
        }
        return false;
    }

    private checkWinDiagonalInvertida(): boolean {
        let count = 0;
        for (let f = tableroClass.getInstance().getFilas(); f >= 1; f--) {
            for (let c = tableroClass.getInstance().getColumnas(); c >= 1; c++) {
                if(count === 4){
                    return true;
                }
                if(tableroClass.getInstance().getBoard()[f][c] === tableroClass.getInstance().getBoard()[f-1][c-1]){
                    count++;
                }
            }
        }
        return false;
    }
}