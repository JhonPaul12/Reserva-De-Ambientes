import { useCallback, useEffect, useState } from "react";
import "./ejemplo.css";
import { horarios, dias } from "./Periodos";
import { Button } from "@nextui-org/react";

interface MenuCheckBoxProps {
  prueba: (checkedItems: {
    [key: number]: { id: number; dia: string; fijo?: boolean };
  }) => void;
  reset: boolean;
  selectedAmbiente: string | number;
}

export const MenuCheckBox = ({
  prueba,
  reset,
  selectedAmbiente,
}: MenuCheckBoxProps) => {
  const [periodos, setPeriodos] = useState<
    { dia: string; hora_inicio: string; id: number }[]
  >([]);
  const [checkedItems, setCheckedItems] = useState<{
    [key: number]: { id: number; dia: string; fijo?: boolean };
  }>({});
  //Cargamos los horarios de la base de datos
  const getPeriodos = useCallback(() => {
    if (periodos.length === 0) {
      fetch(`http://127.0.0.1:8000/api/horario`)
        .then((response) => response.json())
        .then((data) => {
          setPeriodos(data);
        });
    }
  }, [periodos]);

  useEffect(() => {
    if (selectedAmbiente) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/periodosAsignados/${selectedAmbiente}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          const newCheckedItems: Record<
            string,
            { id: number; dia: string; fijo: boolean }
          > = {};
          data.forEach((item: { id_horario: number; dia: string }) => {
            newCheckedItems[item.id_horario] = {
              id: item.id_horario,
              dia: item.dia,
              fijo: true,
            };
          });

          console.log(newCheckedItems);
          setCheckedItems(newCheckedItems);
          console.log(data);
        } catch (error) {
          setCheckedItems({});
          console.error("Error:", error);
        }
      };

      fetchData();
    }
  }, [selectedAmbiente]);

  useEffect(() => {
    setCheckedItems({});
  }, [reset]);

  //Cambiamos el estado de los  checkbox
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    dia: string,
    id: number
  ) => {
    const { checked } = event.target;

    if (checkedItems[id]?.fijo) {
      return;
    }
    if (checked) {
      setCheckedItems({
        ...checkedItems,
        [id]: { id, dia },
      });
    } else {
      const updatedCheckedItems = { ...checkedItems };
      delete updatedCheckedItems[id];
      setCheckedItems(updatedCheckedItems);
    }
  };

  //Seleccionamos todos checkboxs por dias
  const handleSelectAll = (dia: string) => {
    const updatedCheckedItems = { ...checkedItems };
    periodos
      .filter((periodo) => periodo.dia === dia)
      .forEach((periodo) => {
        updatedCheckedItems[periodo.id] = { id: periodo.id, dia: periodo.dia };
      });
    setCheckedItems(updatedCheckedItems);
  };

  useEffect(() => {
    getPeriodos();
  }, [getPeriodos]);

  useEffect(() => {
    prueba(checkedItems);
  }, [checkedItems, prueba]);

  // const resetCheckboxes = () => {
  //   const onlyFixedItems = Object.keys(checkedItems)
  //     .filter((key) => checkedItems[key].fijo)
  //     .reduce((obj, key) => {
  //       obj[key] = checkedItems[key];
  //       return obj;
  //     }, {});
  //   setCheckedItems(onlyFixedItems);
  // };
  const resetCheckboxes = () => {
    const onlyFixedItems = Object.keys(checkedItems)
      .filter((key: string) => checkedItems[Number(key)].fijo)
      .reduce(
        (
          obj: { [key: number]: { id: number; dia: string; fijo?: boolean } },
          key: string
        ) => {
          obj[Number(key)] = checkedItems[Number(key)];
          return obj;
        },
        {}
      );
    setCheckedItems(onlyFixedItems);
  };
  return (
    <div>
      <Button
        onClick={() => {
          console.log(checkedItems);
        }}
      ></Button>
      <table>
        <thead>
          <tr>
            <th style={{ width: "25%" }}>Horario</th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miercoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
            <th>Sabado</th>
          </tr>
          <tr>
            <th>Seleccionar todo</th>
            {dias.map((dia) => (
              <th key={`select-all-${dia}`}>
                <Button
                  className="bg-primary text-white "
                  onClick={() => handleSelectAll(dia)}
                >
                  {dia}
                </Button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horarios.map(([horaInicio, horaFin]) => (
            <tr key={horaInicio}>
              <td>
                {horaInicio} - {horaFin}
              </td>
              {dias.map((dia) => (
                <td key={`${horaInicio}-${dia}`}>
                  {periodos.some(
                    (periodo) =>
                      periodo.dia === dia && periodo.hora_inicio === horaInicio
                  ) &&
                    periodos
                      .filter(
                        (periodo) =>
                          periodo.dia === dia &&
                          periodo.hora_inicio === horaInicio
                      )
                      .map((periodo) => (
                        <input
                          key={periodo.id}
                          className="input"
                          id={periodo.id.toString()}
                          type="checkbox"
                          checked={!!checkedItems[periodo.id] || false}
                          onChange={(event) =>
                            handleCheckboxChange(event, dia, periodo.id)
                          }
                        />
                      ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Button className="bg-primary text-white " onClick={resetCheckboxes}>
        Limpiar
      </Button>
    </div>
  );
};

export default MenuCheckBox;

// import { useCallback, useEffect, useState } from "react";
// import "./ejemplo.css";
// import { FaCheckSquare } from "react-icons/fa";

// // type Item = {
// //   id: number;
// //   name: string;
// //   lunes: boolean;
// //   martes: boolean;
// //   miercoles: boolean;
// //   jueves: boolean;
// //   viernes: boolean;
// //   sabado: boolean;
// //   [key: string]: number | string | boolean; // Index signature allowing any string key with these types
// // };

// type MenuCheckBoxProps = {
//   onCheckboxChange: (
//     checkedCheckboxes: { id: number; name: string; day: string }[]
//   ) => void;
//   reset: boolean;
// };

// export const MenuCheckBox = ({
//   onCheckboxChange,
//   reset,
// }: MenuCheckBoxProps) => {
//   const [data, setData] = useState([
//     {
//       id: 1,
//       name: "6:45 - 7:30",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 2,
//       name: "7:30 - 8:15",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 3,
//       name: "8:15 - 9:00",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 4,
//       name: "9:00 - 9:45",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 5,
//       name: "9:45 - 10:30",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 6,
//       name: "10:30 - 11:15",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 7,
//       name: "11:15 - 12:00",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 8,
//       name: "12:00 - 12:45",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 9,
//       name: "12:45 - 13:30",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 10,
//       name: "13:30 - 14:15",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 11,
//       name: "14:15 - 15:00",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 12,
//       name: "15:00 - 15:45",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 13,
//       name: "15:45 - 16:30",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 14,
//       name: "16:30 - 17:15",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 15,
//       name: "17:15 - 18:00",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 16,
//       name: "18:00 - 18:45",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 17,
//       name: "18:45 - 19:30",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 18,
//       name: "19:30 - 20:15",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 19,
//       name: "20:15 - 21:00",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//     {
//       id: 20,
//       name: "21:00 - 21:45",
//       lunes: false,
//       martes: false,
//       miercoles: false,
//       jueves: false,
//       viernes: false,
//       sabado: false,
//     },
//   ]);

//   const handleCheckboxChange = (id: number, day: string) => {
//     setData((prevData) => {
//       return prevData.map((item) => {
//         if (item.id === id) {
//           return {
//             ...item,
//             [day as keyof typeof item]: !item[day as keyof typeof item],
//           };
//         }
//         return item;
//       });
//     });
//   };

//   const getCheckedCheckboxes = useCallback(() => {
//     const checkedBoxes: { id: number; name: string; day: string }[] = [];
//     data.forEach((item) => {
//       if (item.lunes)
//         checkedBoxes.push({ id: item.id, name: item.name, day: "Lunes" });
//       if (item.martes)
//         checkedBoxes.push({ id: item.id, name: item.name, day: "Martes" });
//       if (item.miercoles)
//         checkedBoxes.push({ id: item.id, name: item.name, day: "Miércoles" });
//       if (item.jueves)
//         checkedBoxes.push({ id: item.id, name: item.name, day: "Jueves" });
//       if (item.viernes)
//         checkedBoxes.push({ id: item.id, name: item.name, day: "Viernes" });
//       if (item.sabado)
//         checkedBoxes.push({ id: item.id, name: item.name, day: "Sábado" });
//     });
//     return checkedBoxes;
//   }, [data]);

//   useEffect(() => {
//     const checkedCheckboxes = getCheckedCheckboxes();
//     onCheckboxChange(checkedCheckboxes);
//     if (reset) {
//       handleResetSelectAll();
//     }
//   }, [data, onCheckboxChange, getCheckedCheckboxes, reset]);

//   // useEffect(() => {
//   //   const checkedCheckboxes = getCheckedCheckboxes();
//   //   onCheckboxChange(checkedCheckboxes);
//   // }, [data, onCheckboxChange, getCheckedCheckboxes]);

//   const handleSelectAll = (day: string) => {
//     setData((prevData) => {
//       if (day === "sabado") {
//         const newData = prevData.map((item) => ({
//           ...item,
//           [day]: item.id <= 7 ? !item[day] : item[day], // Marcar solo los elementos con ID del 1 al 7
//         }));
//         return newData;
//       } else {
//         const allChecked = prevData.every(
//           (item) => item[day as keyof typeof item]
//         );

//         const newData = prevData.map((item) => ({
//           ...item,
//           [day]: !allChecked,
//         }));
//         return newData;
//       }
//     });
//   };

//   const handleResetSelectAll = () => {
//     setData((prevData) =>
//       prevData.map((item) => ({
//         ...item,
//         lunes: false,
//         martes: false,
//         miercoles: false,
//         jueves: false,
//         viernes: false,
//         sabado: false,
//       }))
//     );
//   };

//   return (
//     <div className="contenedor">
//       <style>
//         {`
//                 form {
//                     display: flex;
//                     justify-content: center;
//                 }
//                 input {
//                     background-color: #000000;
//                     height: 25px;
//                     width: 25px;
//                     border-radius: 30px;
//                     border: none;
//                     margin-top: 200px;
//                     margin-bottom: 20px;
//                     font-family: Nunito;
//                 }
//                 `}
//       </style>
//       <table className="table">
//         <thead className="thead">
//           <tr className="tr">
//             <th>Horario</th>
//             <th>Lunes</th>
//             <th>Martes</th>
//             <th>Miércoles</th>
//             <th>Jueves</th>
//             <th>Viernes</th>
//             <th>Sábado</th>
//           </tr>
//         </thead>
//         <tbody className="tbody">
//           {/* Fila para seleccionar todos */}
//           <tr>
//             <td>Seleccionar todo</td>
//             <td>
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => handleSelectAll("lunes")}
//               >
//                 <FaCheckSquare />
//               </button>
//             </td>
//             <td>
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => handleSelectAll("martes")}
//               >
//                 <FaCheckSquare />
//               </button>
//             </td>
//             <td>
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => handleSelectAll("miercoles")}
//               >
//                 <FaCheckSquare />
//               </button>
//             </td>
//             <td>
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => handleSelectAll("jueves")}
//               >
//                 <FaCheckSquare />
//               </button>
//             </td>
//             <td>
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => handleSelectAll("viernes")}
//               >
//                 <FaCheckSquare />
//               </button>
//             </td>
//             <td>
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => handleSelectAll("sabado")}
//               >
//                 <FaCheckSquare />
//               </button>
//             </td>
//           </tr>
//           {data.map((item) => (
//             <tr key={item.id}>
//               <td>{item.name}</td>
//               <td>
//                 <input
//                   className=""
//                   type="checkbox"
//                   id={`checkbox-${item.id}-lunes`}
//                   checked={item.lunes}
//                   onChange={() => handleCheckboxChange(item.id, "lunes")}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="checkbox"
//                   id={`checkbox-${item.id}-martes`}
//                   checked={item.martes}
//                   onChange={() => handleCheckboxChange(item.id, "martes")}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="checkbox"
//                   id={`checkbox-${item.id}-miercoles`}
//                   checked={item.miercoles}
//                   onChange={() => handleCheckboxChange(item.id, "miercoles")}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="checkbox"
//                   id={`checkbox-${item.id}-jueves`}
//                   checked={item.jueves}
//                   onChange={() => handleCheckboxChange(item.id, "jueves")}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="checkbox"
//                   id={`checkbox-${item.id}-viernes`}
//                   checked={item.viernes}
//                   onChange={() => handleCheckboxChange(item.id, "viernes")}
//                 />
//               </td>
//               <td>
//                 {item.id <= 7 && (
//                   <input
//                     type="checkbox"
//                     id={`checkbox-${item.id}-sabado`}
//                     checked={item.sabado}
//                     onChange={() => handleCheckboxChange(item.id, "sabado")}
//                   />
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/* <div>
//         <h2>Checkboxes Marcados:</h2>
//         <ul>
//           {getCheckedCheckboxes().map((item, index) => (
//             <li key={index}>
//               {item.name} - {item.day}
//             </li>
//           ))}
//         </ul>
//       </div> */}
//     </div>
//   );
// };

// export default MenuCheckBox;
