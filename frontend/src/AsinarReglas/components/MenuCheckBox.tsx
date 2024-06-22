import { useCallback, useEffect, useState } from "react";
import "./ejemplo.css";
import { horarios, dias } from "./Periodos";
import { RiCheckboxMultipleFill } from "react-icons/ri";

interface MenuCheckBoxProps {
  prueba: (checkedItems: {
    [key: number]: { id: number; dia: string; fijo?: boolean };
  }) => void;
  reset: boolean;
  selectedAmbiente: string | number;
  selectedRegla: string | number;
}

export const MenuCheckBox = ({
  prueba,
  reset,
  selectedAmbiente,
  selectedRegla,
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
      fetch(import.meta.env.VITE_API_URL + "/api/horario")
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
          // const response = await fetch(
          //   `http://127.0.0.1:8000/api/periodosAsignados/${selectedAmbiente}`
          // );
          const response = await fetch(
            import.meta.env.VITE_API_URL +
              "/api/periodosAsignados/" +
              selectedAmbiente +
              "/" +
              selectedRegla
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
    const allChecked = periodos
      .filter(
        (periodo) => periodo.dia === dia && !checkedItems[periodo.id]?.fijo // Excluir los elementos fijos
      )
      .every((periodo) => !!updatedCheckedItems[periodo.id]);

    periodos
      .filter((periodo) => periodo.dia === dia)
      .forEach((periodo) => {
        if (!checkedItems[periodo.id]?.fijo) {
          // Excluir los elementos fijos
          if (allChecked) {
            delete updatedCheckedItems[periodo.id];
          } else {
            updatedCheckedItems[periodo.id] = {
              id: periodo.id,
              dia: periodo.dia,
            };
          }
        }
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
  // const resetCheckboxes = () => {
  //   const onlyFixedItems = Object.keys(checkedItems)
  //     .filter((key: string) => checkedItems[Number(key)].fijo)
  //     .reduce(
  //       (
  //         obj: { [key: number]: { id: number; dia: string; fijo?: boolean } },
  //         key: string
  //       ) => {
  //         obj[Number(key)] = checkedItems[Number(key)];
  //         return obj;
  //       },
  //       {}
  //     );
  //   setCheckedItems(onlyFixedItems);
  // };
  return (
    <div>
      {/* <Button
        onClick={() => {
          console.log(checkedItems);
        }}
      ></Button> */}
      <table>
        <thead>
          <tr className="tr">
            <th className="th" style={{ width: "25%" }}>
              Horario
            </th>
            <th className="th">Lunes</th>
            <th className="th">Martes</th>
            <th className="th">Miercoles</th>
            <th className="th">Jueves</th>
            <th className="th">Viernes</th>
            <th className="th">Sabado</th>
          </tr>
          <tr className="tr">
            <th className="th">Seleccionar todo</th>
            {dias.map((dia) => (
              <th className="th" key={`select-all-${dia}`}>
                <RiCheckboxMultipleFill
                  className="mx-12"
                  onClick={() => handleSelectAll(dia)}
                />
              </th>
            ))}
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
      {/* <div className="flex justify-end flex-row">
        <Button
          color="warning"
          className=" mt-5 text-white ml-auto"
          onClick={resetCheckboxes}
        >
          Limpiar
        </Button>
      </div> */}
    </div>
  );
};

export default MenuCheckBox;
