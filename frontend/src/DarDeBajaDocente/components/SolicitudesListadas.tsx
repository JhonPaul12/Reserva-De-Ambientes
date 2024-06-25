import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  ModalContent,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
} from "@nextui-org/react";
import "./estilosBusq.css";
import { ISimpleDocente } from "../interfaces/simple-deocente";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const TablaSolicitudes = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [solicitudId, setSolicitudId] = useState<number | null>(null);
  const [solicitudes, setSolicitudes] = useState<ISimpleDocente[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Define aquí la cantidad de elementos por página

  useEffect(() => {
    getSolicitudes();
  }, []);

  const getSolicitudes = async () => {
    // const respuesta = await axios.get(
    //   `http://127.0.0.1:8000/api/usuario/docentes`
    // );
    const respuesta = await axios.get(
      import.meta.env.VITE_API_URL + "/api/usuario/docentes"
    );
    console.log(respuesta.data);
    setSolicitudes(respuesta.data);
  };

  const openModal = (solicitud: ISimpleDocente) => {
    setSolicitudId(solicitud.id);
    setModalOpen(true);
  };

  const cancelarSolicitud = async () => {
    if (solicitudId) {
      try {
        // await axios.get(
        //   `http://127.0.0.1:8000/api/deshabilitarDocente/${solicitudId}`
        // );
        await axios.get(
          import.meta.env.VITE_API_URL +
            "/api/deshabilitarDocente/" +
            solicitudId
        );
        toast.success("Docente deshabilitado");
        setModalOpen(false);
        // Actualizar la lista de solicitudes después de deshabilitar
        getSolicitudes();
      } catch (error) {
        console.error("Error al deshabilitar docente:", error);
      }
    }
  };

  const solicitudesOrdenAlfabetico = [...solicitudes].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(
    solicitudesOrdenAlfabetico.length / itemsPerPage
  );

  // Obtener los elementos de la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSolicitudes = solicitudesOrdenAlfabetico.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-6 space-y-4 mt-4 mx-auto w-full max-w-screen-md text-center">
      <label className="ml-10  text-3xl font-bold text-center text-gray-900">
        LISTA DE DOCENTES{" "}
      </label>
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
            OPCION
          </TableColumn>
        </TableHeader>
        <TableBody>
          {currentSolicitudes.map((solicitud) => (
            <TableRow key={solicitud.id}>
              <TableCell className="text-gray-900 text-xs">
                {solicitud.name}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {solicitud.apellidos}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {solicitud.telefono}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {solicitud.email}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {solicitud.codigo_sis}
              </TableCell>
              <TableCell>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => openModal(solicitud)}
                  variant="shadow"
                >
                  Deshabilitar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Pagination
          showControls
          total={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent className="">
          <ModalHeader>Confirme la acción</ModalHeader>
          <ModalBody>
            <p>¿Está seguro de deshabilitar al docente?</p>
          </ModalBody>
          <ModalFooter className="">
            <Button color="danger" variant="shadow" onClick={cancelarSolicitud}>
              Sí, deshabilitar
            </Button>
            <Button onClick={() => setModalOpen(false)}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
