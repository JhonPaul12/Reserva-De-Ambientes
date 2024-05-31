import { useEffect, useState } from "react";

import { horarios, dias } from "./Periodos";
import "./MenuCheckBox.css";
import { Button } from "@nextui-org/react";
//import { toast } from "sonner";

export const ModalMenuCheckBox = ({ Periodos, onCheckboxesChange }) => {
  const [periodos, setPeriodos] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    getPeriodos();
  }, []);
  useEffect(() => {
    onCheckboxesChange(checkedItems);
  }, [checkedItems, onCheckboxesChange]);

  useEffect(() => {
    cargarCheckbox(Periodos);
  }, [Periodos]);

  const getPeriodos = async () => {
    fetch(`http://127.0.0.1:8000/api/horario`)
      .then((response) => response.json())
      .then((data) => {
        setPeriodos(data);
      });
    console.log("veces periodos");
  };

  const handleCheckboxChange = (event, dia, id) => {
    const { checked } = event.target;
    if (checked) {
      // Si el checkbox está marcado, añadimos su ID y el día al estado
      setCheckedItems({
        ...checkedItems,
        [id]: { id, dia },
      });
    } else {
      // Si el checkbox no está marcado, eliminamos su ID del estado
      const { [id]: value, ...remainingCheckedItems } = checkedItems;
      setCheckedItems(remainingCheckedItems);
    }
    console.log("veces checkbox");
  };

  const cargarCheckbox = async (lista) => {
    // Verificar si la lista no está vacía
    if (lista.length > 0) {
      const nuevosCheckedItems = {};
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

  return (
    <div>
      <Button onPress={() => console.log(checkedItems)} className="bg-primary">
        {" "}
        Prueba{" "}
      </Button>
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
                          id={periodo.id}
                          type="checkbox"
                          checked={checkedItems[periodo.id] || false}
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
