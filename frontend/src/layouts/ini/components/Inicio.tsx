import { Input, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { ISimpleAmbiente } from "../../../VerAmbientes/interfaces/simple-ambientes";


export const Inicio = () => {

  const [periodos, setPeriodos] = useState<ISimpleAmbiente[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAmbientes, setFilteredAmbientes] = useState<ISimpleAmbiente[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage= 5;





  const getPeriodos = async () => {
    try {
      const respuesta = await axios.get(
        `http://127.0.0.1:8000/api/ambientesLibres`
      );
      setPeriodos(respuesta.data);
    } catch (error) {
      console.error('Error fetching periodos:', error);
    }
  };

  useEffect(() => {
    getPeriodos();
  }, []);

  useEffect(() => {
    const resultadosFiltrados = periodos.filter(periodo =>
      periodo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAmbientes(resultadosFiltrados);
    
  }, [searchTerm, periodos]);
  const totalPages = Math.ceil(filteredAmbientes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAmbientes = filteredAmbientes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

    return (
        <div className="relative min-h-[85vh] sm:mx-auto max-w-screen">
          <div className="absolute inset-0">
            <img
              src="/images/depositphotos_38461143-stock-photo-bright-white-hall-with-windows.jpg"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex flex-col md:flex-row">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg md:w-1/2 mb-6 md:mb-0 text-center items-center mt-10 ml-10">

            <label className="mt-10 text-azul text-4xl  font-bold">¡Bienvenido a la plataforma de reservas de la FCyT! </label>
            <br/>
            <label className="mt-5 text-lg text-azul font-semibold"> Aprovecha la comodidad y eficiencia de gestionar tus reservas desde cualquier lugar</label>
            <div className="w-full items-center">
            <Input
                type="text"
                placeholder="Buscar ambientes..."
                className="w-full text-center text-lg p-3 mt-8 mb-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                endContent={
                    <BiSearch className="text-2xl text-azul text-default-400 pointer-events-none flex-shrink-0" />
                  }
              />
            </div>
              
              <h1 className="text-sm">Inicia sesión y descubre lo fácil que es asegurar el ambiente perfecto para tus actividades en la Facultad de Ciencias y Tecnología.</h1>

            </div>
            <div className="w-full md:w-1/2 mt-10">
            <Table hideHeader  className="sm:mx-auto sm:w-full sm:max-w-sm mt-10 w-full">
            <TableHeader >
              <TableColumn className="text-center  text-sm bg-slate-300">
                NOMBRE
              </TableColumn>
              <TableColumn className="text-center  text-sm bg-slate-300">
                ...
              </TableColumn>
            </TableHeader>
            <TableBody>
                {currentAmbientes.length > 0 ? (
                    currentAmbientes.map((periodo) => (
                        <TableRow key={periodo.id}  className="bg-white p-4 rounded shadow mb-2">
                        <TableCell className="text-xl">{periodo.nombre}</TableCell>
                        <TableCell>¡Listo para reservar!</TableCell>
                        {/* Puedes agregar más detalles del periodo aquí */}
                        </TableRow>
                    ))
                ) : (
                    <TableRow className="text-black">
                        <TableCell>No se encontraron ambientes libres.</TableCell>
                        <TableCell>...</TableCell>
                        </TableRow>
                )}
                  </TableBody>
                  </Table>
                  <div className="flex justify-center my-4">
                  <Pagination
                    total={totalPages}
                    initialPage={1}
                    onChange={(page) => setCurrentPage(page)}
                  />
              </div>
            </div>
            </div>
          </div>
        </div>
      );
}
