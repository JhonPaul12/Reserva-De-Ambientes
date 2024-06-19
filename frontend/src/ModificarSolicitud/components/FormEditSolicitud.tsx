// import {
//   //Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
// } from "@nextui-org/react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { EditSolicitudModal } from "./EditSolicitudModal";
// import { Solicitud } from "../interface/solicitud";

// export const FormEditSolicitud = () => {
//   const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);

//   useEffect(() => {
//     getSolicitudes();
//   }, []);

//   const getSolicitudes = async () => {
//     const respuesta = await axios.get<Solicitud[]>(
//       `http://127.0.0.1:8000/api/showAllDocentes/Vladimir Abel`
//     );
//     const solicitudesPendientes = respuesta.data.filter(
//       (solicitud) => solicitud.estado === "Pendiente"
//     );
//     setSolicitudes(solicitudesPendientes);
//   };

//   return (
//     <div className="contenedor-table justify-center text-center">
//       <label className=" text-3xl font-bold align-middle text-gray-900">
//         Editar Solicitud
//       </label>
//       <section className="mx-6 my-4">
//         <Table className="custom-table" aria-label="Tabla de datos">
//           <TableHeader>
//             <TableColumn className="text-center text-3xl bg-slate-300">
//               Id
//             </TableColumn>
//             <TableColumn className="text-center text-3xl bg-slate-300">
//               Ambiente
//             </TableColumn>
//             <TableColumn className="text-center text-3xl bg-slate-300">
//               H. Inicio
//             </TableColumn>
//             <TableColumn className="text-center text-3xl bg-slate-300">
//               H. Final
//             </TableColumn>
//             <TableColumn className="text-center text-3xl bg-slate-300">
//               Fecha
//             </TableColumn>
//             <TableColumn className="text-center text-3xl bg-slate-300">
//               Nro. Est.
//             </TableColumn>
//             <TableColumn className="text-center text-3xl bg-slate-300">
//               Estado
//             </TableColumn>
//             <TableColumn className="text-center text-3xl bg-slate-300">
//               Opcion
//             </TableColumn>
//           </TableHeader>
//           <TableBody>
//             {solicitudes.map((solicitud) => (
//               <TableRow key={solicitud.id}>
//                 <TableCell className="text-base text-black">
//                   {solicitud.id}
//                 </TableCell>
//                 <TableCell className="text-base text-black">
//                   {solicitud.ambiente.nombre}
//                 </TableCell>
//                 <TableCell className="text-base text-black">
//                   {solicitud.hora_inicio}
//                 </TableCell>
//                 <TableCell className="text-base text-black">
//                   {solicitud.hora_fin}
//                 </TableCell>
//                 <TableCell className="text-base text-black">
//                   {solicitud.fecha_solicitud}
//                 </TableCell>
//                 <TableCell className="text-base text-black">
//                   {solicitud.numero_estudiantes}
//                 </TableCell>
//                 <TableCell className="text-base text-black">
//                   {solicitud.estado}
//                 </TableCell>
//                 <TableCell className="text-base text-black">
//                   <EditSolicitudModal solicitud={solicitud} />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </section>
//     </div>
//   );
// };
