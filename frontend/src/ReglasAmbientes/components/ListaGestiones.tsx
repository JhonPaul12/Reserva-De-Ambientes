import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface Gestion {
  id: number;
  nombre: string;
  fecha_inicial: string;
  fecha_final: string;
  activa: string;
}
export const ListaGestiones = ({ refresh }: { refresh: boolean }) => {
  const [gestion, setGestion] = useState<Gestion[]>([]);

  useEffect(() => {
    const fetchGestiones = async () => {
      try {
        // const response = await fetch("http://127.0.0.1:8000/api/regla/");
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/regla/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGestion(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchGestiones();
  }, [refresh]);
  return (
    <div className="sm:mx-6 sm:my-4 mt-10 mx-auto w-full max-w-screen-md">
      <h2 className="text-2xl font-bold text-center text-gray-900">
        Lista de peridos académicos
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
            FECHA INICIAL
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            FECHA FINAL
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            ACTIVA
          </TableColumn>
        </TableHeader>
        <TableBody>
          {gestion.map((gestion) => (
            <TableRow key={gestion.id}>
              <TableCell className="text-gray-900 text-md text-center">
                {gestion.nombre}
              </TableCell>
              <TableCell className="text-gray-900 text-md text-center">
                {gestion.fecha_inicial}
              </TableCell>
              <TableCell className="text-gray-900 text-md text-center">
                {gestion.fecha_final}
              </TableCell>
              <TableCell className="text-gray-900 text-md text-center">
                {gestion.activa}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
