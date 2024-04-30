import { useState } from "react";
import "./ejemplo.css";

const MenuCheckBox = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "6:45 - 7:30",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
    {
      id: 2,
      name: "7:30 - 8:15",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
    {
      id: 3,
      name: "8:15 - 9:00",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
    {
      id: 4,
      name: "9:00 - 9:45",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
    {
      id: 5,
      name: "9:45 - 10:30",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
    {
      id: 6,
      name: "10:30 - 11:15",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
    {
      id: 7,
      name: "11:15 - 12:45",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
    {
      id: 8,
      name: "12:45 - 13:30",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
    {
      id: 9,
      name: "13:30 - 14:15",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
    {
      id: 10,
      name: "13:30 - 14:15",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
    {
      id: 11,
      name: "13:30 - 14:15",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
    {
      id: 12,
      name: "13:30 - 14:15",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
    {
      id: 13,
      name: "13:30 - 14:15",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
    {
      id: 14,
      name: "13:30 - 14:15",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
    {
      id: 15,
      name: "13:30 - 14:15",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
    {
      id: 16,
      name: "13:30 - 14:15",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
    },
  ]);

  const handleCheckboxChange = (id: number, day: string) => {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [day as keyof typeof item]: !item[day as keyof typeof item],
          };
        }
        return item;
      });
    });
  };

  const getCheckedCheckboxes = () => {
    const checkedBoxes: { name: string; day: string }[] = [];
    data.forEach((item) => {
      if (item.lunes) checkedBoxes.push({ name: item.name, day: "Lunes" });
      if (item.martes) checkedBoxes.push({ name: item.name, day: "Martes" });
      if (item.miercoles)
        checkedBoxes.push({ name: item.name, day: "Miércoles" });
      if (item.jueves) checkedBoxes.push({ name: item.name, day: "Jueves" });
      if (item.viernes) checkedBoxes.push({ name: item.name, day: "Viernes" });
      if (item.sabado) checkedBoxes.push({ name: item.name, day: "Sábado" });
    });
    return checkedBoxes;
  };

  console.log("Checkboxes Marcados:", getCheckedCheckboxes());
  return (
    <div className="contenedor">
      <style>
        {`
                form {
                    display: flex;
                    justify-content: center;
                }
                input {
                    background-color: #000000; 
                    height: 25px;
                    width: 25px;
                    border-radius: 30px;
                    border: none;
                    margin-top: 200px;
                    margin-bottom: 20px;
                    font-family: Nunito;
                }
                `}
      </style>
      <table className="table">
        <thead className="thead">
          <tr className="tr">
            <th>Horario</th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
            <th>Sábado</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <input
                  className=""
                  type="checkbox"
                  id={`checkbox-${item.id}-lunes`}
                  checked={item.lunes}
                  onChange={() => handleCheckboxChange(item.id, "lunes")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id={`checkbox-${item.id}-martes`}
                  checked={item.martes}
                  onChange={() => handleCheckboxChange(item.id, "martes")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id={`checkbox-${item.id}-miercoles`}
                  checked={item.miercoles}
                  onChange={() => handleCheckboxChange(item.id, "miercoles")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id={`checkbox-${item.id}-jueves`}
                  checked={item.jueves}
                  onChange={() => handleCheckboxChange(item.id, "jueves")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id={`checkbox-${item.id}-viernes`}
                  checked={item.viernes}
                  onChange={() => handleCheckboxChange(item.id, "viernes")}
                />
              </td>
              <td>
                {item.id <= 7 && (
                  <input
                    type="checkbox"
                    id={`checkbox-${item.id}-sabado`}
                    checked={item.sabado}
                    onChange={() => handleCheckboxChange(item.id, "sabado")}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Checkboxes Marcados:</h2>
        <ul>
          {getCheckedCheckboxes().map((item, index) => (
            <li key={index}>
              {item.name} - {item.day}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuCheckBox;
