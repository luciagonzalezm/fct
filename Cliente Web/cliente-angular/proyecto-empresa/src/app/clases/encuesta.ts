import { Pregunta } from "./pregunta";

export class Encuesta {
    constructor(public id: number, public titulo: string, public descripcion: string, public preguntas: Array<Pregunta>) { }
}
