import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { AulaReservada } from "../interfaces/AmbienteDatos";
import { Button } from "@nextui-org/react";
import { IoIosPrint } from "react-icons/io";

export const Table = ({ data }: { data: AulaReservada[] }) => {
  const componentRef = useRef(null);

  if (!Array.isArray(data)) {
    return <div>No tiene datos</div>;
  }

  const pageStyle = `
    @media print {
      body, html, .print-container {
        height: 100%;
        padding: 5px;
        text-aling:center;
      }
    }
  `;

  return (
    <div className="w-full h-full text-center">
      <div className="print-container w-full h-full" ref={componentRef}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f2f2f2",
                borderBottom: "2px solid #ddd",
              }}
            >
              <th>Aula</th>
              <th>Cant. de Reservas</th>
              <th>Fechas</th>
              <th>Horarios</th>
              <th>Docentes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((aula, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                <td>{aula.Aulas}</td>
                <td>{aula.Cantidad_de_Reservas}</td>
                <td>
                  {aula.Fechas_de_Solicitudes.map((fecha, fechaIndex) => (
                    <div key={fechaIndex}>{new Date(
                      fecha.Fecha_de_Solicitud + "T00:00:00"
                    ).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}</div>
                  ))}
                </td>
                <td>
                  {aula.Fechas_de_Solicitudes.map((fecha, fechaIndex) => (
                    <div key={fechaIndex}>
                      {fecha.Hora_de_Inicio.slice(0, 5)} -{" "}
                      {fecha.Hora_de_Fin.slice(0, 5)}
                    </div>
                  ))}
                </td>
                <td>
                  {aula.Fechas_de_Solicitudes.map((fecha, fechaIndex) => (
                    <div key={fechaIndex}>
                      <small>{fecha.Docentes.join(", ")}</small>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="hidden sm:block print-button-container">
        <ReactToPrint
          trigger={() => (
            <Button
              className="text-white"
              color="success"
              variant="shadow"
              endContent={<IoIosPrint />}
              style={{ marginLeft: "80%" }}
            >
              Imprimir
            </Button>
          )}
          content={() => componentRef.current}
          pageStyle={pageStyle}
        />
      </div>
    </div>
  );
};
