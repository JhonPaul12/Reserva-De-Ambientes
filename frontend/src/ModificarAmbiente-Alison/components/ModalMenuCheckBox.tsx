import { useCallback, useEffect, useState } from "react";

import { horarios, dias } from "./Periodos";
import "./MenuCheckBox.css";
import { RiCheckboxMultipleFill } from "react-icons/ri";

interface Periodo {
  id: number;
  id_ambiente: number;
  id_horario: number;
  hora_inicio: string;
  hora_fin: string;
  fecha: string;
  estado: string;
  dia: string;
}

interface CheckedItems {
  [key: number]: { id: number; dia: string };
}

interface ModalMenuCheckBoxProps {
  Periodos: Periodo[];
  checkboxCreated: (newCreatedItems: CheckedItems) => void;
  checkboxDeleted: (newDeleteItems: number[]) => void;
  limpiar: boolean;
}

type CreatedItems = {
  [key: number]: { id: number; dia: number };
};
export const ModalMenuCheckBox = ({
  Periodos,
  checkboxCreated,
  checkboxDeleted,
  limpiar,
}: ModalMenuCheckBoxProps) => {
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [createdItems, setCreatedItems] = useState({});
  const [deleteItems, setDeleteItems] = useState<number[]>([]);

  const [selectAll, setSelectAll] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    getPeriodos();
  }, []);

  useEffect(() => {
    setCreatedItems({});
    setDeleteItems([]);
    setCheckedItems({});
  }, [limpiar]);

  useEffect(() => {
    checkboxCreated(createdItems);
    checkboxDeleted(deleteItems);
  }, [
    checkedItems,
    checkboxCreated,
    checkboxDeleted,
    createdItems,
    deleteItems,
  ]);

  useEffect(() => {
    cargarCheckbox(Periodos);
  }, [Periodos]);

  const guardar = useCallback(() => {
    const nuevosMarcados = Object.values(checkedItems).filter(
      (item) =>
        !Array.isArray(Periodos) ||
        !Periodos.some((periodo) => periodo.id_horario === item.id)
    );

    const filteredDeleteItems = deleteItems.filter(
      (id) =>
        Array.isArray(Periodos) &&
        Periodos.some((item) => item.id_horario === id)
    );

    if (JSON.stringify(nuevosMarcados) !== JSON.stringify(createdItems)) {
      setCreatedItems(nuevosMarcados);
    }

    if (JSON.stringify(filteredDeleteItems) !== JSON.stringify(deleteItems)) {
      setDeleteItems(filteredDeleteItems);
    }
  }, [checkedItems, deleteItems, Periodos, createdItems]);

  useEffect(() => {
    guardar();
  }, [checkedItems, deleteItems, Periodos, guardar]);

  const getPeriodos = async () => {
    // fetch(`http://127.0.0.1:8000/api/horario`)
    fetch(import.meta.env.VITE_API_URL + "/api/horario")
      .then((response) => response.json())
      .then((data) => {
        setPeriodos(data);
      });
    console.log("veces periodos");
  };

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    dia: string,
    id: number
  ) => {
    const { checked } = event.target;
    if (checked) {
      // Si el checkbox está marcado, añadimos su ID y el día al estado
      setCheckedItems({
        ...checkedItems,
        [id]: { id, dia },
      });
      // Remover el ID de deleteItems si existe
      setDeleteItems(deleteItems.filter((itemId) => itemId !== id));
    } else {
      // Si el checkbox no está marcado, eliminamos su ID del estado
      const { [id]: value, ...remainingCheckedItems } = checkedItems;
      console.log(value);
      setCheckedItems(remainingCheckedItems);
      // Agregar el ID a deleteItems si no existe
      if (!deleteItems.includes(id)) {
        setDeleteItems([...deleteItems, id]);
      }
    }
  };

  const cargarCheckbox = async (lista: Periodo[]) => {
    // Verificar si la lista no está vacía
    if (lista.length > 0) {
      const nuevosCheckedItems: { [key: number]: { id: number; dia: string } } =
        {};
      lista.forEach((item) => {
        nuevosCheckedItems[item.id_horario] = {
          id: item.id_horario,
          dia: item.dia,
        };
      });
      setCheckedItems(nuevosCheckedItems);
    }
    console.log("veces cargar");
  };

  const handleSelectAllChange = (dia: string) => {
    const newSelectAllStatus = !selectAll[dia];
    setSelectAll({ ...selectAll, [dia]: newSelectAllStatus });

    const newCheckedItems = { ...checkedItems };
    const newCreatedItems: CreatedItems = { ...createdItems };
    const newDeleteItems = [...deleteItems];

    periodos
      .filter((periodo) => periodo.dia === dia)
      .forEach((periodo) => {
        if (newSelectAllStatus) {
          newCheckedItems[periodo.id] = { id: periodo.id, dia };

          // Si el elemento no está en createdItems y no está en la lista original, lo agregamos a createdItems
          if (
            !(periodo.id in createdItems) &&
            Periodos &&
            Array.isArray(Periodos) &&
            !Periodos.some((item) => item.id_horario === periodo.id)
          ) {
            newCheckedItems[periodo.id] = { id: periodo.id, dia: String(dia) };
          }
          // Si el elemento está en deleteItems, lo eliminamos de deleteItems
          const deleteIndex = newDeleteItems.indexOf(periodo.id);
          if (deleteIndex > -1) {
            newDeleteItems.splice(deleteIndex, 1);
          }
        } else {
          delete newCheckedItems[periodo.id];

          // Si el elemento está en createdItems, lo eliminamos de createdItems
          if (
            Object.prototype.hasOwnProperty.call(newCreatedItems, periodo.id)
          ) {
            delete newCreatedItems[periodo.id];
          }
          // Si el elemento no está en deleteItems y está en la lista original, lo agregamos a deleteItems
          if (
            !newDeleteItems.includes(periodo.id) &&
            Periodos &&
            Array.isArray(Periodos) &&
            Periodos.some((item) => item.id_horario === periodo.id)
          ) {
            newDeleteItems.push(periodo.id);
          }
        }
      });
    setCheckedItems(newCheckedItems);
    setCreatedItems(newCreatedItems);
    setDeleteItems(newDeleteItems);
  };

  return (
    <div>
      {/* <Button
        className="bg-primary"
        onClick={() => {
          console.log(createdItems);
          console.log(deleteItems);
        }}
      ></Button> */}
      <table>
        <thead>
          <tr className="tr">
            <th className="th" style={{ width: "200px" }}>
              Horario
            </th>
            <th className="th">Lunes</th>
            <th className="th">Martes</th>
            <th className="th">Miercoles</th>
            <th className="th">Jueves</th>
            <th className="th">Viernes</th>
            <th className="th">Sabado</th>
          </tr>
        </thead>
        <tbody>
          <tr className="tr">
            <td className="td">Seleccionar Todo</td>
            {dias.map((dia) => (
              <td className="td" key={`new-${dia}`}>
                <RiCheckboxMultipleFill
                  className="mx-14 w-6 h-6"
                  onClick={() => handleSelectAllChange(dia)}
                />
              </td>
            ))}
          </tr>
          {horarios.map(([horaInicio, horaFin]) => (
            <tr className="tr" key={horaInicio}>
              <td className="td">
                {horaInicio} - {horaFin}
              </td>
              {dias.map((dia) => (
                <td className="td" key={`${horaInicio}-${dia}`}>
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
                          checked={Boolean(checkedItems[periodo.id])}
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
    </div>
  );
};

export default ModalMenuCheckBox;
