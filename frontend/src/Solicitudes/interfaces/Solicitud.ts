export interface Solicitud {
    id: number;
    motivo: string;
    fecha_solicitud: string;
    hora_inicio: string;
    hora_fin: string;
    estado: string,
    numero_estudiantes: number,
    ambiente_id:number,
    created_at: string,
    updated_at: string,
    pivot: {
        user_id: number,
        solicitud_id: number
    }
    ambiente: {
      id: number,
      nombre: string,
      tipo: string,
      ubicacion: string,
      capacidad: number,
    },
    docente: {
      id: number,
      nombre: string,
      apellido: string
    }
  }