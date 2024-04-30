export interface Ambiente {
    id: number;
    nombre: string;
    capacidad: number;
    tipo: string;
    ubicacion: string;
}
export interface Periodo {
    id: number;
    id_ambiente: number;
    id_horario: number;
    estado: string;
    fecha: string;
  }
export interface Horario {
    id: number;
    dia: number;
    hora_inicio: string;
    hora_fin: string;
  }
  