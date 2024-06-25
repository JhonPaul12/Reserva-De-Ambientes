import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface Feriado {
  id: number;
  fecha_excepcion: string;
  motivo: string;
}

export const ListaFeriados = ({ refresh }: { refresh: boolean }) => {
  const [feriados, setFeriados] = useState<Feriado[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchGestiones = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/excepcion/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFeriados(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchGestiones();
  }, [refresh]);

  // Calculate the indices for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFeriados = feriados.slice(indexOfFirstItem, indexOfLastItem);

  const reformatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="sm:mx-6 my-4 mt-10 sm:mx-auto w-full max-w-screen-md">
      <h2 className="text-2xl font-bold text-center text-gray-900">
        Lista de Feriados
      </h2>
      <Table
        className="custom-table"
        aria-label="Example table with dynamic content"
      >
        <TableHeader>
          <TableColumn className="text-center  text-sm bg-slate-300">
            MOTIVO
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            FECHA
          </TableColumn>
        </TableHeader>
        <TableBody>
          {currentFeriados.map((feriado) => (
            <TableRow key={feriado.id}>
              <TableCell className="text-gray-900 text-md text-center">
                {feriado.motivo}
              </TableCell>
              <TableCell className="text-gray-900 text-md text-center">
                {reformatDate(feriado.fecha_excepcion)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Pagination
          showControls
          total={Math.ceil(feriados.length / itemsPerPage)}
          initialPage={1}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default ListaFeriados;
