export interface SolicitudD {
  solicitud_id: number;
  solicitud: Solicitud;
  periodos: Periodo[];
}

interface Solicitud {
  id: number;
  motivo: string;
  fecha_solicitud: string;
  estado: string;
  numero_estudiantes: number;
  id_materia: number;
  ambiente_id: number;
  created_at: string;
  updated_at: string;
  materia: Materia;
  users: User[];
  ambientes: Ambiente[];
}

interface Materia {
  id: number;
  nombre_materia: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  name: string;
  apellidos: string;
  telefono: string;
  codigo_sis: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Ambiente {
  id: number;
  nombre: string;
  tipo: string;
  ubicacion: string;
  capacidad: number;
  created_at: string;
  updated_at: string;
}

interface Periodo {
  periodo_id: number;
  periodo: PeriodoDetail;
}

interface PeriodoDetail {
  id: number;
  id_ambiente: number;
  id_horario: number;
  estado: string;
  fecha: string;
  created_at: string;
  updated_at: string;
  horario: Horario;
}

interface Horario {
  id: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
  created_at: string;
  updated_at: string;
}
