import { Doc } from "../types/Jugador";
import fs from 'fs/promises';

export default class CoheteModel{
    public getInfoApiSpaceX = async (): Promise<Doc> => {
        console.log('Llega');

        // Realizamos la solicitud a la API
        const res = await fetch('https://api.spacexdata.com/v5/launches/latest', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                'a': 1
            })
            
        });

        // Verificamos si la respuesta es válida
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Parseamos el JSON de la respuesta
        const responseJson = await res.json();
        const launches1 : Doc =responseJson as Doc;// Asegúrate de que esta sea la única vez que consumes el cuerpo
        this.writeFile(launches1);
        return launches1; // Devolvemos los lanzamientos
    };

    private async writeFile(cohete: Doc){
        try{
            const dataJson = JSON.stringify(cohete);
            await fs.writeFile('D:/CursoJava/Programacion/Web/QuizChristian/QuizChristian/database/launch.json', dataJson, 'utf-8');
        }catch(error){
            console.error("Error al escribir el archivo", error);
        }
    }

    public async readFile(): Promise<Doc | null>{
        try{
            const readData = await fs.readFile('D:/CursoJava/Programacion/Web/QuizChristian/QuizChristian/database/launch.json', 'utf-8');
            if(readData === null){
                throw new Error("No se ha leído el archivo");
            }
            const doc: Doc= JSON.parse(readData);
            return doc;
        }catch(error){
            console.error("Error al leer el archivo", error);
            return null;
        }
    }



    public getImage = async (): Promise<string> => {
        const res = await fetch('https://api.spacexdata.com/v5/launches/latest', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
    });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        };
        const jsonCohete = await res.json();
        const link = jsonCohete.links.patch.small;
        return link;
    };
}