import readline from "readline/promises";

const prompt = async (message) => {
  // leer consola input y output para construir  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  //promesa question = objeto
  const answer = await rl.question(message);

  rl.close();
  return answer;
};

async function simpleSum() {
  const a = await prompt("Enter first number: ");
  const b = await prompt("Enter second number: ");
  console.log("Sum is", Number(a) + Number(b));
}
simpleSum();

// null objeto como tal
// undefined  variable que no tiene nada
// empty cadena vacia 
// Nan Depende de la aritmetica