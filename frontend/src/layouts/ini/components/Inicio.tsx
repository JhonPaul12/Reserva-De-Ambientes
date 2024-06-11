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
    /*calculateItemsPerPage();
    window.addEventListener("resize", calculateItemsPerPage);
    return () => window.removeEventListener("resize", calculateItemsPerPage);*/
  }, []);

  useEffect(() => {
    const resultadosFiltrados = periodos.filter(periodo =>
      periodo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAmbientes(resultadosFiltrados);
    
  }, [searchTerm, periodos]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredAmbientes.length / itemsPerPage);

  // Get the items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAmbientes = filteredAmbientes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  //const calculateItemsPerPage = () => {
  //  const headerHeight = 35;
  //  const rowHeight = 90;
  //  const availableHeight = window.innerHeight - headerHeight;
  //  const items = Math.floor(availableHeight / rowHeight);
  //  setItemsPerPage(items);
  //};

    return (
        <div className="relative min-h-[85vh]">
          <div className="absolute inset-0">
            <img
              src="/images/depositphotos_38461143-stock-photo-bright-white-hall-with-windows.jpg"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative flex items-center justify-center min-h-[85vh] bg-azul bg-opacity-50">
            <div className="flex mt-5 space-y-6">
            <div className="mt-5 ml-5 mx-auto w-full sm:w-1/2 p-5 text-center">
            
              <h1 className="text-white text-4xl mb-3 font-bold">¡Bienvenido a la plataforma de reservas de la FCyT! </h1>
              <h1 className="text-lg text-azul font-semibold"> Aprovecha la comodidad y eficiencia de gestionar tus reservas desde cualquier lugar</h1>
                
              <Input
                type="text"
                placeholder="Buscar ambientes..."
                className="w-full text-center text-lg p-3"
                
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                endContent={
                    <BiSearch className="text-2xl text-azul text-default-400 pointer-events-none flex-shrink-0" />
                  }
              />
              <h1>Inicia sesión y descubre lo fácil que es asegurar el ambiente perfecto </h1>
                <h1>para tus actividades en la Facultad de Ciencias y Tecnología.</h1>

            </div>
            <div className="mt-10 ml-5 w-full sm:w-1/2 p-5">
            <Table hideHeader  className="sm:mx-auto sm:w-full sm:max-w-sm mt-4 w-full">
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
