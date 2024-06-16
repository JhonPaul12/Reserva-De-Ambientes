import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ModificarDocenteModal } from "./ModificarDocenteModal";
interface Docente {
  id: number;
  name: string;
  apellidos: string;
  telefono: string;
  email: string;
  codigo_sis: string;
}

export const ListaDocentes = () => {
  const [docentes, setDocentes] = useState<Docente[]>([]);

  const fetchDocentes = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/usuario/docentes"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDocentes(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchDocentes();
  }, []);

  const handleDocenteUpdate = async () => {
    await fetchDocentes(); // Actualizar la lista de docentes
  };

  return (
    <div className="mx-6 my-4 mt-10 sm:mx-auto w-full max-w-screen-md">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        Editar Docentes
      </h2>
      <Table
        className="custom-table"
        aria-label="Example table with dynamic content"
      >
        <TableHeader>
          <TableColumn className="text-center  text-sm bg-slate-300">
            NOMBRE
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            APELLIDOS
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            TELEFONO
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            EMAIL
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            CÓDIGO SIS
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            ACCIONES
          </TableColumn>
        </TableHeader>
        <TableBody>
          {docentes.map((docente) => (
            <TableRow key={docente.id}>
              <TableCell className="text-gray-900 text-xs">
                {docente.name}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {docente.apellidos}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {docente.telefono}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {docente.email}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {docente.codigo_sis}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                <ModificarDocenteModal
                  docente={docente}
                  onDocenteUpdate={handleDocenteUpdate}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
