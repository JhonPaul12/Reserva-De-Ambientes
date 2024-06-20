import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useSolicitudStore } from "../store/solicitud.store";
import axios from "axios";
import { ISimpleDocente } from "../interfaces/simple-docente";
import { ISimpleMateria } from "../interfaces/simple-materia";
import { ISimpleGrupo } from "../interfaces/simple-grupo";
import { ISimpleAmbiente } from "../../VerAmbientes/interfaces/simple-ambientes";
import React from "react";
import { ISimplePeriodo } from "../interfaces/simple-periodo";

export const FormSolicitud = () => {
  const motivosReserva = [
    "Clase",
    "Taller",
    "Conferencia",
    "Examen",
    "Actividad extracurricular",
    "Presentación",
    "Seminario",
    "Ensayo",
    "Sesión de tutoría",
    "Prueba práctica",
    "Simposio",
    "Debate",
    "Jornada de capacitación",
    "Reunión de equipo",
    "Laboratorio práctico",
    "Trabajo en grupo",
    "Sesión de estudio",
    "Sesión informativa",
  ];
  const instanciaInicial: ISimpleDocente = {
    id: 0, // Pon el valor que necesites aquí
    name: "",
    apellidos: "",
    telefono: "",
    codigo_sis: "",
    email: "",
    email_verified_at: null,
    materias_grupos: {},
  };
  const [inputMateria, setInputMateria] = useState("");
  const [inputMotivo, setInputMotivo] = useState("");
  const [inputNEst, setInputNEst] = useState("");
  const [inputGrupo, setInputGrupo] = useState("");
  const [inputAmbiente, setInputAmbiente] = useState("");
  const [inputFecha, setInputFecha] = useState("");
  /*const [inputHIni, setInputHIni] = useState('06:45');*/
  const [inputHIni, setInputHIni] = useState<ISimplePeriodo[]>([]);

  // const [inputHFin, setInputHFin] = useState([]);
  const [inputHFin, setInputHFin] = useState<string[]>([]);
  const [docentes, setDocentes] = useState<ISimpleDocente[]>([]);
  const [materias, setMaterias] = useState<ISimpleMateria[]>([]);
  const [grupos, setGrupos] = useState<ISimpleGrupo[]>([]);
  const [ambientes, setAmbientes] = useState<ISimpleAmbiente[]>([]);
  const [usuario, setUsuario] = useState(instanciaInicial);
  // const [selects, setSelects] = useState([]);
  const [selects, setSelects] = useState<{ id: number; value: string }[]>([]);
  const [listdocentes, setListDocentes] = useState<string[]>([]);

  const createSolicitud = useSolicitudStore((state) => state.createSolicitud);

  const sortedOptions = [...docentes].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const anadir = async (id: string) => {
    if (!listdocentes.includes(id)) {
      setListDocentes([...listdocentes, id]);
      console.log("ID añadido:", id);
    } else {
      toast.error("El docente ya está presente en la lista:", { id });
    }
  };

  // const handleDateChange = (date: Date) => {
  //   console.log(date);

  //   const fecha = `${date.getFullYear()}-${(date.getMonth() + 1)
  //     .toString()
  //     .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  //   const fechaActual = new Date();

  //   const fechaSeleccionada = new Date(fecha);
  //   if (fechaSeleccionada > fechaActual) {
  //     setInputFecha(fecha);
  //     console.log(fecha);
  //     console.log(inputFecha);
  //     getRangos(fecha);
  //   } else {
  //     toast.error(
  //       "La fecha seleccionada no es valida seleccione una fecha posterior a la de hoy."
  //     );
  //     console.log(
  //       "La fecha seleccionada no es valida seleccione una fecha posterior a la de hoy."
  //     );
  //     setInputFecha(fecha);
  //   }
  // };

  interface DateValue {
    year: number;
    month: number;
    day: number;
  }

  const handleDateChange = (value: DateValue) => {
    const date = new Date(value.year, value.month - 1, value.day); // Create Date object

    const fecha = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    const fechaActual = new Date();
    const fechaSeleccionada = new Date(fecha);

    if (fechaSeleccionada > fechaActual) {
      setInputFecha(fecha);
      // ...
    } else {
      // ...
    }
  };
  // const handleDateChange = (date:Date) => {
  //   console.log(date);

  //   const fecha = `${date.year.toString()}-${date.month.toString()}-${date.day.toString()}`;
  //   const fechaActual = new Date();

  //   const fechaSeleccionada = new Date(fecha);
  //   if (fechaSeleccionada > fechaActual) {
  //     setInputFecha(fecha);
  //     console.log(fecha);
  //     console.log(inputFecha);
  //     getRangos(fecha);
  //   } else {
  //     toast.error(
  //       "La fecha seleccionada no es valida seleccione una fecha posterior a la de hoy."
  //     );
  //     console.log(
  //       "La fecha seleccionada no es valida seleccione una fecha posterior a la de hoy."
  //     );
  //     setInputFecha(fecha);
  //   }
  // };

  const handleClick = async () => {
    const limiteSelects = 5;
    if (selects.length < limiteSelects) {
      setSelects((prevSelects) => [
        ...prevSelects,
        { id: prevSelects.length, value: "" },
      ]);
    } else {
      toast.error("Se ha alcanzado el límite de docentes");
    }
  };

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    selectId: number
  ) => {
    const { value } = event.target as HTMLSelectElement;

    console.log(selectId);
    if (!listdocentes.includes(value)) {
      setSelects((prevSelects) =>
        prevSelects.map((select) =>
          select.id === selectId ? { ...select, value } : select
        )
      );
      anadir(value);
    } else {
      // toast.error("El docente ya está presente en la lista:", value);
      toast.error(`El docente ya está presente en la lista: ${value}`);
    }
    console.log(value);
  };

  useEffect(() => {
    const id = 2;
    getUsuario(id);
    getDocentes();
    getMaterias(id);
    getGrupos(3, id);
    getAmbientes();
    anadir(`${id}`);
  }, []);

  const getDocentes = async () => {
    // const respuesta = await axios.get(`http://127.0.0.1:8000/api/usuario/`);
    const respuesta = await axios.get(
      import.meta.env.VITE_API_URL + "/api/usuario/"
    );
    setDocentes(respuesta.data);
  };
  const getMaterias = async (id: number) => {
    // const respuesta = await axios.get(
    //   `http://127.0.0.1:8000/api/usuario/materias/${id}/`
    // );
    const respuesta = await axios.get(
      import.meta.env.VITE_API_URL + "/api/usuario/materias/" + id
    );
    setMaterias(respuesta.data);
  };
  const getGrupos = async (materia_id: number, docente_id: number) => {
    // const respuesta = await axios.get(
    //   `http://127.0.0.1:8000/api/docentes/${docente_id}/${materia_id}`
    // );
    const respuesta = await axios.get(
      import.meta.env.VITE_API_URL +
        "/api/docentes/" +
        docente_id +
        "/" +
        materia_id
    );
    setGrupos(respuesta.data);
  };
  const getAmbientes = async () => {
    // const respuesta = await axios.get(`http://127.0.0.1:8000/api/ambiente/`);
    const respuesta = await axios.get(
      import.meta.env.VITE_API_URL + "/api/ambiente/"
    );
    setAmbientes(respuesta.data);
    console.log(inputFecha);
  };
  const getUsuario = async (id: number) => {
    // const respuesta = await axios.get(
    //   `http://127.0.0.1:8000/api/usuario/${id}`
    // );
    const respuesta = await axios.get(
      import.meta.env.VITE_API_URL + "/api/usuario/" + id
    );
    console.log(respuesta.data);
    setUsuario(respuesta.data);
    console.log(usuario);
  };
  const getRangos = async (fecha: string) => {
    const dataToSend = {
      id_ambiente: inputAmbiente,
      fecha: fecha,
    };
    console.log(dataToSend);
    // const respuesta = await axios.post<ISimplePeriodo[]>(
    //   "http://127.0.0.1:8000/api/disposicion/",
    //   dataToSend
    // );
    const respuesta = await axios.post<ISimplePeriodo[]>(
      import.meta.env.VITE_API_URL + "/api/disposicion/",
      dataToSend
    );
    const responseData = respuesta.data;
    const rangosHorario: string[] = [];
    responseData.forEach((objeto) => {
      const { hora_inicio, hora_fin } = objeto;
      const rangoHorario = `${hora_inicio} - ${hora_fin}`;
      rangosHorario.push(rangoHorario);
    });

    setInputHIni(responseData);
    console.log(responseData);
  };

  const onInputChangeMateria = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target as HTMLSelectElement;
    console.log(value);
    setInputMateria(value);
    getGrupos(parseInt(value), 2);
  };
  const onInputChangeGrupo = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const inputValue = e.target as HTMLSelectElement;
    setInputGrupo(inputValue.value);
    console.log(inputValue.value);
  };
  const onInputChangeAmbiente = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target as HTMLSelectElement;
    setInputAmbiente(value);
    getRangos(inputFecha);
  };

  const [values, setValues] = React.useState<Set<string>>(new Set([]));

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const valores = e.target.value;
    const arrayNumeros = valores.split(",").map((numero) => numero.trim());
    setInputHFin(arrayNumeros);
    setValues(new Set<string>(e.target.value.split(",")));
    console.log(values);
  };
  // const [values, setValues] = React.useState<Selection>(new Set([]));

  // const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   console.log(e.target.value);
  //   const valores = e.target.value;
  //   const arrayNumeros = valores.split(",").map((numero) => numero.trim());
  //   setInputHFin(arrayNumeros);
  //   setValues(new Set(e.target.value.split(",")));
  //   console.log(values);
  // };

  const onInputChangeMotivo = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const inputValue = e.target as HTMLSelectElement;
    if (inputValue.value.length < 30) {
      setInputMotivo(inputValue.value);
    } else {
      toast.error("El motivo debe tener como maximo 150 caracteres");
      console.log("El motivo debe tener como maximo 150 caracteres");
    }
  };
  const onInputChangeNEst = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;
    if (inputValue.value.length < 6) {
      if (!isNaN(parseInt(inputValue.value))) {
        setInputNEst(inputValue.value);
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

  const onInputChangeSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (
      inputMotivo !== "" &&
      inputNEst !== "" &&
      inputFecha !== "" &&
      inputMateria !== "" &&
      inputGrupo !== "" &&
      inputAmbiente !== "" &&
      inputHFin.length > 0
    ) {
      const fechaActual = new Date();
      const fechaSeleccionada = new Date(inputFecha);

      if (fechaSeleccionada > fechaActual) {
        console.log(listdocentes);
        await createSolicitud(
          inputMotivo,
          inputFecha,
          "Pendiente",
          parseInt(inputNEst),
          parseInt(inputMateria),
          [String(inputGrupo)],
          parseInt(inputAmbiente),
          listdocentes,
          inputHFin
        );
        setInputMateria("1");
        setInputMotivo("");
        setInputNEst("");
        setInputGrupo("");
        setInputAmbiente("1");
        setInputFecha("");
      } else {
        toast.error(
          "La fecha seleccionada no es valida seleccione una fecha posterior a la de hoy."
        );
      }
    } else {
      toast.error("Todos los campos son obligatorios");
      console.log("Todos los campos son obligatorios");
    }
  };
  const options = inputHIni.map((inputHIn) => ({
    label: `${inputHIn.hora_inicio.slice(0, -3)} - ${inputHIn.hora_fin.slice(
      0,
      -3
    )}`,
    value: inputHIn.id,
  }));

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
            {usuario.name} {usuario.apellidos}
          </span>
          <button
            type="button"
            className="flex justify-center rounded-md bg-azul p-5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleClick}
          >
            Añadir docente
          </button>
          {selects.map((select) => (
            <Select
              key={select.id}
              value={select.value}
              onChange={(event) => handleSelectChange(event, select.id)}
              className="mt-2 w-full text-gray-900"
              aria-label="Selecciona una docente"
              placeholder="Seleccione una opcion..."
            >
              {sortedOptions.map((docente) => (
                <SelectItem key={docente.id} value={docente.id}>
                  {docente.name} {docente.apellidos}
                </SelectItem>
              ))}
            </Select>
          ))}
          <br />
          <label className="text-ms text-gray-900">Materia:</label>
          <br />
          <Select
            value={inputMateria}
            className="w-full"
            aria-label="Selecciona una materia"
            placeholder="Seleccione una opcion..."
            onChange={onInputChangeMateria}
          >
            {materias.map((materia) => (
              <SelectItem key={materia.id} value={materia.id}>
                {materia.nombre_materia}
              </SelectItem>
            ))}
          </Select>
          <br />
          <label className="text-ms text-gray-900">Motivo:</label>
          <br />
          <Select
            value={inputMotivo}
            className="w-full"
            aria-label="Selecciona una motivo"
            placeholder="Seleccione una opcion..."
            onChange={onInputChangeMotivo}
          >
            {motivosReserva.map((motivo, index) => (
              <SelectItem key={index} value={motivo}>
                {motivo}
              </SelectItem>
            ))}
          </Select>
          <br />
          <label className="text-ms text-gray-900">Nro Est:</label>
          <Input
            type="number"
            value={inputNEst}
            className="w-full"
            style={{
              fontSize: "10px",
              padding: "20px",
            }}
            onChange={onInputChangeNEst}
            min="0"
          />
          <br />
          <label className="text-ms text-gray-900">Grupo:</label>
          <Select
            value={inputGrupo}
            onChange={onInputChangeGrupo}
            className="w-full text-gray-900"
            aria-label="Selecciona una grupo"
            placeholder="Seleccione una opcion..."
          >
            {grupos.map((grup) => (
              <SelectItem key={grup.id} value={grup.id}>
                {grup.grupo}
              </SelectItem>
            ))}
          </Select>
          <label className="text-ms text-gray-900">Ambiente:</label>
          <br />
          <Select
            value={inputAmbiente}
            onChange={onInputChangeAmbiente}
            className="w-full"
            aria-label="Selecciona una ambiente"
            placeholder="Seleccione una opcion..."
          >
            {ambientes.map((ambiente) => (
              <SelectItem key={ambiente.id} value={ambiente.id}>
                {ambiente.nombre}
              </SelectItem>
            ))}
          </Select>
          <br />
          <label className="text-ms text-gray-900">Fecha de reserva:</label>
          <br />
          <DatePicker
            className="p-2 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Selecciona una fecha"
            onChange={handleDateChange}
          />
          <br />
          <label className="text-ms text-gray-900">Horario de inicio:</label>
          <br />
          {/*<Select 
            value={inputHIni}
            onChange={onInputChangeHIni}
            className="w-full"
            aria-label="6:45"
            placeholder="Seleccione una opcion..."
            >
             {horasInicio.map((inputHIni, index) => (
          <SelectItem key={index} value={inputHIni}>{inputHIni}</SelectItem>
        ))}
      </Select>*/}
          <Select
            label="Periodos de reserva"
            selectionMode="multiple"
            placeholder="Seleccione periodo..."
            selectedKeys={values}
            className="mt-2 mb-5 w-full"
            onChange={handleSelectionChange}
          >
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
          <br />
          {/*  <label className='text-ms text-gray-900'> Horario de fin:</label>
            <br />
            <Select 
            value={inputHFin}
            onChange={onInputChangeHFin}
            className="w-full"
            aria-label="7:30"
            placeholder="Seleccione una opcion..."
            >
            {horasFin.map((inputHFin, index) => (
          <SelectItem key={index} value={inputHFin}>{inputHFin}</SelectItem>
        ))}
            </Select>
            <br />*/}
          <div className="flex gap-5 items-center">
            <Button size="lg" className="w-full  mb-10" color="primary">
              Cancelar
            </Button>
            <Button
              onClick={onInputChangeSave}
              size="lg"
              className="w-full mb-10"
              color="primary"
            >
              {" "}
              Enviar{" "}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
