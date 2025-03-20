"use strict";
let newVar='Esta es una variable nueva'

const newConst= 'esta es una constante u operador referencia'

const object ={
    name:'Pepe',
    apellido:'Perez',
}

console.log(`${object.name}  ${object.apellido}`)

let variable = 123 //se ca,bia a cualquier tipo

// poner ; mejor practica 



//funciones
function hola(a,b,c,d){
    console.log('ola')
}

hola();
hola// se entrega la funcion 


// con funciones async
(function(){
    console.log('anonimo')
})

const arrow1 =()=>'arrow function';
console.log(arrow1)

const arrow2 =(param1,param2)=>{
    return param1+param2;
} 
console.log(arrow2(1,2))