/*
Hacer buscaminas de 16*16
por consola
*/

import { count } from "console";
import readline from "readline/promises";

const prompt = async (message) => {
  // Leer consola input y output para construir
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await rl.question(message); // Leer la entrada
  rl.close(); // Cerrar readline
  return answer;
};

const size = 16;
const cuadriculaStrings = [];
const cuadriculaJuego = [];
// crea siempre cuadriculas
for (let i = 0; i < size; i++) {
  const fila = [];
  const filaNum = [];
  for (let j = 0; j < size; j++) {
    fila.push("x");
    filaNum.push(0);
  }
  cuadriculaStrings.push(fila);
  cuadriculaJuego.push(filaNum)
}

function imprimir(matriz) {
  let base = "   ";
  for (let i = 0; i < size; i++) {
    base += i.toString().padStart(2, " ") + " ";
  }
  console.log(base);

  for (let i = 0; i < size; i++) {
    let fila = i.toString().padStart(2, " ") + " "; // Índice de la fila
    for (let j = 0; j < size; j++) {
    // if(matriz[i][j] === 'M'){
    //     fila += 'x' + "  ";
    // }else{
    //     fila += matriz[i][j] + "  ";
    // }
    // if(cuadriculaJuego[i][j] == 0){
    //   fila += cuadriculaJuego[i][j] + "  ";
    // }else{
        fila += matriz[i][j] + "  ";
      }
    // }
    console.log(fila);
  }
    console.log( "\nNum Minas= "+numMin)

  //   console.log('-------------------------------')

  //   for (let i = 0; i < size; i++) {
  //     let filla = " "; // Índice de la fila
  //     for (let j = 0; j < size; j++) {
  //       filla += cuadriculaJuego[i][j] + "  ";
  //   }
  //   console.log(filla);
  // }
  
}

const minas = Math.floor(Math.random() * (size * size / 2) + 1);
let numMin = minas;

const llenarCuadriculaM = (matriz, numMinas) => {
  for (let k = 0; k < numMinas; k++) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size); 
    matriz[x][y] = "M";
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= 0 && i < size && j >= 0 && j < size && matriz[i][j] !== "M") {
          matriz[i][j]++;
        }
      }
    }

  }
};

llenarCuadriculaM(cuadriculaJuego, minas);


async function play() {
  imprimir(cuadriculaStrings);
  let status = true
  while (status && numMin !== 0) {
    console.log('--------------------------------------------------------')
    const a = await prompt(
      "Mark Mine:  1 \nNot a Mine :  2  \nStop : 0\nYour choice: "
    );

    if (Number(a) === 0) {
      status = false;
      console.log("Juego terminado.");
      break;
    }

    if (Number(a) === 1) {
      status = await marcarMinas(cuadriculaStrings);
    }

    if (Number(a) === 2) {
      status = await marcarCerca(cuadriculaStrings);
    }
  }
  if(numMin === 0){
    console.log('Haz ganado estamos agradecidos :V')
  }else{
    console.log('Perdiste Carnal')
  }
}


const marcarMinas = async (matriz) => {
  const a = await prompt("x (0-15): ");
  const b = await prompt("y (0-15): ");
  const x = Number(a);
  const y = Number(b);

  if (cuadriculaJuego[x][y] === "M" && numMin >= 1) {
    cuadriculaStrings[x][y] = "?";
    --numMin;
    console.log("Mina marcada");
    imprimir(cuadriculaStrings);
    return true;
  } else {
    console.log("Perdiste :)");
    imprimir(matriz);
    return false
  }
};

const marcarCerca = async (matriz) => {
  const a = await prompt("x (0-15): ");
  const b = await prompt("y (0-15): ");
  const x = Number(a);
  const y = Number(b);

  if (cuadriculaJuego[x][y] === "M" || cuadriculaStrings[x][y] === "?" ) {
    console.log("Perdiste :)");
    return false
  } else {
    // cuadriculaStrings[x][y]= cuadriculaJuego[x][y];
    
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= 0 && i < size && j >= 0 && j < size && cuadriculaJuego[i][j] !== "M"){
          cuadriculaStrings[i][j]= cuadriculaJuego[i][j]
        }
      }

    }
    console.log(`Casilla marcada con ${cuadriculaJuego[x][y]} minas cercanas.`);
    imprimir(cuadriculaStrings);
    return true;
  }
};

play();
