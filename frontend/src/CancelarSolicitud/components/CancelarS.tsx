import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Solicitud {
  id: number;
  motivo: string;
  fecha_solicitud: string;
  hora_inicio: string;
  hora_fin: string;
  estado: string;
  numero_estudiantes: number;
  ambiente_id: number;
  created_at: string;
  updated_at: string;
  pivot: {
    user_id: number;
    solicitud_id: number;
  };
  ambiente: {
    id: number;
    nombre: string;
    tipo: string;
    ubicacion: string;
    capacidad: number;
  };
  docente: {
    id: number;
    nombre: string;
    apellido: string;
  };
}

export const CancelarS = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  
    useEffect(()=>{
      getSolicitudes();
    }, []);
  
    const getSolicitudes = async () => {
      const respuesta = await axios.get<Solicitud[]>(`http://127.0.0.1:8000/api/showAllDocentes/Vladimir Abel`);
      const solicitudesPendientes = respuesta.data.filter(solicitud => solicitud.estado === "Pendiente");
      setSolicitudes(solicitudesPendientes);
    }

    const handleCancelarSolicitud = async (solicitudId: number) => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/solicitud/${solicitudId}`);
        const nuevasSolicitudes = solicitudes.filter(solicitud => solicitud.id !== solicitudId);
        setSolicitudes(nuevasSolicitudes);
      } catch (error) {
        console.error("Error al cancelar la solicitud:", error);
      }
    }

  return (
    <div className="contenedor-table">
     <label className='ml-10 text-3xl font-bold text-center text-gray-900'>CANCELAR SOLICITUD</label>
      <section className="mx-6 my-4">
        <Table className="custom-table" aria-label="Tabla de datos">
          <TableHeader>
            <TableColumn className="text-center text-3xl bg-slate-300">Id</TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">Ambiente</TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">H. Inicio</TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">H. Final</TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">Fecha</TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">Nro. Est.</TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">Estado</TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">Opcion</TableColumn>
          </TableHeader>
          <TableBody>
            {solicitudes.map((solicitud) => (
              <TableRow key={solicitud.id}>
                <TableCell className="text-base text-black">
                  {solicitud.id}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.ambiente.nombre}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.hora_inicio}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.hora_fin}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.fecha_solicitud}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.numero_estudiantes}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.estado}
                </TableCell>
                <TableCell className="text-base text-black">
                  <Button className="bg-danger" onClick={() => handleCancelarSolicitud(solicitud.id)}>Cancelar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};
