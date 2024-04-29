import { useState } from "react";
import { toast } from "sonner";
import { Calendario } from "./Calendario";

export const FormSolicitud = () => {
  const [inputMotivo, setInputMotivo] = useState("");
  const [inputNEst, setInputNEst] = useState("");
  const [mostrarSelect, setMostrarSelect] = useState(false);

  const onInputChangeMotivo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target as HTMLTextAreaElement;
    if (inputValue.value.length < 30) {
      setInputMotivo(inputValue.value);
      console.log(inputValue);
    } else {
      toast.error("El motivo debe tener como maximo 150 caracteres");
      console.log("El motivo debe tener como maximo 150 caracteres");
    }
  };
  const onInputChangeNEst = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;
    if (inputValue.value.length < 6) {
      if (!isNaN(parseInt(inputValue.value))) {
        setInputNEst(inputValue.value);
        console.log(inputValue);
      } else {
        setInputNEst("");
        toast.error("El numero de estudiantes debe expresarse numericamente");
        console.log("El numero de estudiantes debe expresarse numericamente");
      }
    } else {
      setInputNEst("");
      toast.error("El numero de estudiantes no debe superar los 5 caracteres");
      console.log("El numero de estudiantes no debe superar los 5 caracteres");
    }
  };

  const onInputChangeSave = () => {
    if (inputMotivo !== "" && inputNEst !== "") {
      console.log("true");
    } else {
      toast.error("El motivo y el nro de estudiantes son obligatorios");
      console.log("l motivo y el nro de estudiantes son obligatorios");
    }
  };
  const handleClick = () => {
    setMostrarSelect(!mostrarSelect);
  };
  return (
    <div>
      <label className="text-3xl font-bold text-center text-gray-900">
        CREAR SOLICITUD
      </label>
      <form className="mt-5 space-y-6">
        <div className="columnaR">
          <label className="text-ms text-gray-900">Docente:</label>
          <br />
          <span
            style={{ marginRight: "50px" }}
            className="text-ms text-gray-900"
          >
            Nombre del docente
          </span>
          <button
            type="button"
            className=" flex justify-center rounded-md bg-azul p-5  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleClick}
          >
            Añadir docente
          </button>
          {mostrarSelect && (
            <select className="mt-5 h-full w-full rounded-md border-3 bg-gray-300 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lm  "></select>
          )}
          <br />
          <label className="text-ms text-gray-900">Materia:</label>
          <br />
          <select className="h-full w-full rounded-md border-3 bg-gray-300 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lm  "></select>
          <br />
          <label className="text-ms text-gray-900">Motivo:</label>
          <br />
          <textarea
            value={inputMotivo}
            className="h-full w-full rounded-md border-3 bg-gray-300 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lm  "
            style={{
              fontSize: "16px",
              padding: "20px",
            }}
            onChange={onInputChangeMotivo}
          />
          <br />
          <label className="text-ms text-gray-900">Nro Est:</label>
          <input
            type="number"
            value={inputNEst}
            className="h-full w-full rounded-md border-3 bg-gray-300 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lm  "
            style={{
              fontSize: "10px",
              padding: "20px",
            }}
            onChange={onInputChangeNEst}
          />
          <br />
          <label className="text-ms text-gray-900">Grupo:</label>
          <select className="h-full w-full rounded-md border-3 bg-gray-300 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lm  "></select>
          <label className="text-ms text-gray-900">Ambiente:</label>
          <br />
          <select className="h-full w-full rounded-md border-3 bg-gray-300 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lm  "></select>
          <br />
          <label className="text-ms text-gray-900">Fecha de reserva:</label>
          <br />
          <Calendario />
          <br />
          <label className="text-ms text-gray-900">Horario de inicio:</label>
          <br />
          <select className="h-full w-full rounded-md border-3 bg-gray-300 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lm  "></select>
          <br />
          <label className="text-ms text-gray-900"> Horario de fin:</label>
          <br />
          <select className="h-full w-full rounded-md border-3 bg-gray-300 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lm  "></select>
          <br />
          <div className="opcions">
            <button className="mt-10 flex w-full justify-center rounded-md bg-azul p-5  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Cancelar
            </button>
            <button
              onClick={onInputChangeSave}
              className="mt-2 mb-5 flex w-full justify-center rounded-md bg-azul p-5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
