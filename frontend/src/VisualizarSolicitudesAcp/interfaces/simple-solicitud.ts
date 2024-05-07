import { ISimpleAmbiente } from "../../VerAmbientes/interfaces/simple-ambientes";

export interface ISimpleSolicitud {
    id: number;
    motivo: string;
    fecha_solicitud: string;
    hora_inicio: string;
    hora_fin: string;
    estado: string;
    numero_estudiantes: number;
    ambiente: ISimpleAmbiente;
    id_materia: number;
  }