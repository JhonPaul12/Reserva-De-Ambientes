export interface Notificacion {
    id: number;
    id_usuario: number;
    id_solicitud: number;
    titulo: string;
    contenido: string;
    visto: number;
    created_at: string;
    updated_at: string;
    user: User;
    solicitud: Solicitud;
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

interface Materia {
    id: number;
    nombre_materia: string;
    user_id: number;
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

interface Solicitud {
    id: number;
    motivo: string;
    fecha_solicitud: string;
    estado: string;
    numero_estudiantes: number;
    id_materia: number;
    id_grupo: number;
    ambiente_id: number;
    created_at: string;
    updated_at: string;
    materia: Materia;
    ambiente: Ambiente;
}

