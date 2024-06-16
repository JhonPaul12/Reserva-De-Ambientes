
import { ISimpleMateria } from "../../CrearSolicitud/interfaces/simple-materia";
import { ISimpleAmbiente } from "../../VerAmbientes/interfaces/simple-ambientes";
import { ISimpleDocente } from "./simple-deocente";

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
    materia: ISimpleMateria;
    docente: ISimpleDocente;
  }