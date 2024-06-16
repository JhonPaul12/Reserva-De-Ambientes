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

export interface AulaReservada {
  Aulas: number | string;
  Cantidad_de_Reservas: number;
  Fechas_de_Solicitudes: Solicitud[];
}

interface Solicitud {
  Fecha_de_Solicitud: string;
  Hora_de_Inicio: string;
  Hora_de_Fin: string;
  Docentes: string[];
}