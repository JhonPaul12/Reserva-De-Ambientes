export interface AmbientesCont {
  Aulas: string;
  Cantidad_de_Reservas: number;
}

export interface AmbienteLineas {
  Aula: number;
  Meses: [Mes];
}
interface Mes{
  mes:string,
  cantidad:number
}
