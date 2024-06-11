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
  } from "@nextui-org/react";
  import "./estilosBusq.css";
import { ISimpleDocente } from "../interfaces/simple-deocente";
import { useEffect, useState } from "react";
import axios from "axios";
  
  export const TablaSolicitudes = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [solicitudId, setSolicitudId] = useState<number | null>(null);
    const [solicitudes, setSolicitudes] = useState<ISimpleDocente[]>([]);

    useEffect(() => {
      getSolicitudes();
    }, [solicitudes]);

    const getSolicitudes = async () => {
      const respuesta = await axios.get(
        `http://127.0.0.1:8000/api/usuario/docentes`
      );
      console.log(respuesta.data);
      setSolicitudes(respuesta.data);
    }
    const openModal = (solicitud: ISimpleDocente) => {
      setSolicitudId(solicitud.id);
      setModalOpen(true);
    };
  
    const cancelarSolicitud = async () => {
      if (solicitudId) {
        try {
          await axios.get(
            `http://127.0.0.1:8000/api/deshabilitarDocente/${solicitudId}`
          );
          setModalOpen(false);
        } catch (error) {
          console.log(solicitudId);
          console.error("Error al deshabilitar docente:", error);
        }
      }
    };

    const solicitudesOrdenAlfabetico = [...solicitudes].sort((a, b) =>
      a.name.localeCompare(b.name)
  );

    return (
      <div className="mx-6 my-4 mt-10 sm:mx-auto w-full max-w-screen-md">
        <label className="ml-10 text-3xl font-bold text-center text-gray-900">
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
              {solicitudesOrdenAlfabetico.map((solicitud) => (
                <TableRow key={solicitud.id}>
                  <TableCell className="text-gray-900 text-xs">{solicitud.name}</TableCell>
                  <TableCell className="text-gray-900 text-xs">{solicitud.apellidos}</TableCell>
                  <TableCell className="text-gray-900 text-xs">
                    {solicitud.telefono}
                  </TableCell>
                  <TableCell className="text-gray-900 text-xs">
                    {solicitud.email}
                  </TableCell>
                  <TableCell className="text-gray-900 text-xs">{solicitud.codigo_sis}</TableCell>
                  <TableCell> 
                    <Button
                    color="danger"
                    size="sm"
                    onClick={() => openModal(solicitud)}
                    variant="shadow"
                    >
                      Deshabilitar</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <ModalContent className="">
            <ModalHeader>Confirme la accion</ModalHeader>
            <ModalBody>
              <p>¿Esta seguro de deshabilitar al docente?</p>
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