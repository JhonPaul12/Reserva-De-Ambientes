export interface ISimpleSolicitud {
  id: number;
  motivo: string;
  fecha_solicitud: Date;
  hora_inicio: string;
  hora_fin: string;
  estado: string;
  numero_estudiantes: number;
  ambiente_id: number;
  created_at: Date;
  updated_at: Date;
  ambiente: Ambiente;
}

export interface Ambiente {
  id: number;
  nombre: string;
  tipo: string;
  ubicacion: string;
  capacidad: number;
  created_at: Date;
  updated_at: Date;
}
