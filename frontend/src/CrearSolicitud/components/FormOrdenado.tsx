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
import { ISimpleExcepcion } from "../interfaces/simple-exception";

export const FormOrdenado = () => {
  useEffect(() => {
    const id = 2;
    getUsuario(id);
    getDocentes();
    getMaterias(id);
    getExcepciones();
    if (listOficial.length === 0) {
      setListOficial([`${id}`]);
    }
  }, []);

  //DOCENTES
  const instanciaInicial: ISimpleDocente = {
    id: 0, // Pon el valor que necesites aquí
    name: "",
    apellidos: "",
    telefono: "",
    codigo_sis: "",
    email: "",
    email_verified_at: null,
  };
  const [usuario, setUsuario] = useState(instanciaInicial);
  const [docentes, setDocentes] = useState<ISimpleDocente[]>([]);
  const [valuesDocentes, setValuesDocentes] = React.useState<Selection>(
    new Set([])
  );
  const [listOficial, setListOficial] = useState([]);
  const [listdocentes, setListDocentes] = useState([]);

  const getUsuario = async (id: number) => {
    const respuesta = await axios.get(
      `http://127.0.0.1:8000/api/usuario/${id}`
    );
    console.log(respuesta.data);
    setUsuario(respuesta.data);
    console.log(usuario);
  };

  const docentesOrdenAlfabetico = [...docentes].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const getDocentes = async () => {
    const respuesta = await axios.get(`http://127.0.0.1:8000/api/usuario/`);
    setDocentes(respuesta.data);
  };

  const handleSelectionChangeDocentes = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const valores = e.target.value;
    const arrayNumeros = valores.split(",").map((numero) => numero.trim());
    console.log(arrayNumeros);
    setListDocentes(arrayNumeros);
    console.log(listOficial);
    console.log(listdocentes);
    setValuesDocentes(new Set(e.target.value.split(",")));
  };

  const optionsDocentes = docentesOrdenAlfabetico.map((docente) => ({
    label: `${docente.name} ${docente.apellidos}`,
    value: docente.id,
  }));

  //MATERIA

  const [inputMateria, setInputMateria] = useState("");
  const [materias, setMaterias] = useState<ISimpleMateria[]>([]);

  const getMaterias = async (id: number) => {
    const respuesta = await axios.get(
      `http://127.0.0.1:8000/api/usuario/materias/${id}/`
    );
    setMaterias(respuesta.data);
  };

  const onInputChangeMateria = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target as HTMLSelectElement;
    console.log(value);
    setInputMateria(value);
    getGrupos(parseInt(value));
  };

  //MOTIVO

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

  const [inputMotivo, setInputMotivo] = useState("");

  const onInputChangeMotivo = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const inputValue = e.target as HTMLSelectElement;
    console.log(inputValue.value);
    if (inputValue.value.length < 30) {
      setInputMotivo(inputValue.value);
    } else {
      toast.error("El motivo debe tener como maximo 150 caracteres");
      console.log("El motivo debe tener como maximo 150 caracteres");
    }
  };

  //NUMERO DE ESTUDIANTES

  const [inputNEst, setInputNEst] = useState("");

  const onInputChangeNEst = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;
    if (inputValue.value.length < 6) {
      if (!isNaN(parseInt(inputValue.value))) {
        setInputNEst(inputValue.value);
        getAmbientes(inputValue.value);
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

  //GRUPO

  const [inputGrupo, setInputGrupo] = useState("");
  const [grupos, setGrupos] = useState<ISimpleGrupo[]>([]);
  const [listGrupos, setListGrupos] = useState([]);
  const [valuesGrupos, setValuesGrupos] = React.useState<Selection>(
    new Set([])
  );

  const getGrupos = async (materia_id: number) => {
    try {
      // Obtener los grupos para el docente principal
      const respuestaPrincipal = await axios.get(
        `http://127.0.0.1:8000/api/gruposMateria/${materia_id}`
      );
      setGrupos(respuestaPrincipal.data);
    } catch (error) {
      console.error("Error al obtener los grupos:", error);
    }
  };
  const verificarMateria = async () => {
    if (inputMateria === "") toast.error("Seleccione una materia");
  };

  const handleSelectionChangeGrupos = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const valores = e.target.value;
    const arrayNumeros = valores.split(",").map((numero) => numero.trim());
    console.log(arrayNumeros);
    setListGrupos(arrayNumeros);
    setValuesGrupos(new Set(e.target.value.split(",")));
  };

  //AMBIENTE

  const [inputAmbiente, setInputAmbiente] = useState("");
  const [ambientes, setAmbientes] = useState<ISimpleAmbiente[]>([]);

  const getAmbientes = async (num: string) => {
    const respuesta = await axios.get(`http://127.0.0.1:8000/api/ambiente/`);
    const filteredAmbientes = respuesta.data.filter(
      (ambiente: ISimpleAmbiente) => ambiente.capacidad >= parseInt(num)
    );
    setAmbientes(filteredAmbientes);
    console.log(respuesta.data);
    console.log(filteredAmbientes);
  };

  const optionsAmbiente = ambientes.map((ambiente) => ({
    label: `${ambiente.nombre} (Cap: ${ambiente.capacidad} personas)`,
    value: ambiente.id,
  }));

  const onInputChangeAmbiente = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target as HTMLSelectElement;
    console.log(inputHIni);
    console.log(value);
    setInputAmbiente(value);
    if (inputHIni.length != 0 || inputFecha != "") {
      setInputHIni([]);
      console.log("pasa");
      console.log(inputFecha);
      const fechaDuplicada = excepciones.find((obj) => {
        const fechaObjetoFormato = obj.fecha_excepcion;
        return fechaObjetoFormato === inputFecha;
      });
      if (fechaDuplicada) {
        toast.error(
          `La fecha selecionada es ${fechaDuplicada.motivo} no esta disponible para reservas`
        );
        return;
      } else {
        console.log("llego rangos de ambiente");
        getRangos(value, inputFecha);
      }
    }
    //Deveriamos verificar si la fecha no esta vacia
    //getRangos(inputFecha);
    console.log(inputAmbiente);
  };
  const verificarCapacidad = async () => {
    if (inputNEst === "")
      toast.error(
        "Por favor, complete el campo Nro Est. para ver la lista de ambientes disponibles con la capacidad adecuada."
      );
    if (inputNEst != "" && ambientes.length === 0)
      toast.error(
        "No existen ambientes que con capacidad apta para el numero de estudiantes requerido"
      );
    console.log(ambientes);
  };

  //FECHA

  const [inputFecha, setInputFecha] = useState("");
  const [excepciones, setExcepciones] = useState<ISimpleExcepcion[]>([]);

  const getExcepciones = async () => {
    const respuesta = await axios.get(`http://127.0.0.1:8000/api/excepcion`);
    setExcepciones(respuesta.data);
    console.log(respuesta.data);
  };
  const handleDateChange = async (date) => {
    console.log(date);

    const fecha = `${date.year.toString()}-${date.month.toString()}-${date.day.toString()}`;
    const fechaActual = new Date();

    const fechaSeleccionada = new Date(fecha);
    if (fechaSeleccionada > fechaActual) {
      setInputFecha(fecha);
      console.log(fecha);
      console.log(inputFecha);
      const fechaDuplicada = excepciones.find((obj) => {
        const fechaObjetoFormato = obj.fecha_excepcion;
        return fechaObjetoFormato === fecha;
      });
      if (fechaDuplicada) {
        toast.error(
          `La fecha selecionada es ${fechaDuplicada.motivo} no esta disponible para reservas`
        );
        console.log("pasa exception");
        return;
      } else {
        if (inputAmbiente === "") {
          toast.error("Seleccione un ambiente");
          return;
        } else {
          console.log("llego rangos de fecha");
          await getRangos(inputAmbiente, fecha);
        }
      }
    } else {
      toast.error(
        "La fecha seleccionada no es valida seleccione una fecha posterior a la de hoy."
      );
      console.log(
        "La fecha seleccionada no es valida seleccione una fecha posterior a la de hoy."
      );
      setInputFecha(fecha);
    }
  };

  //PERIODO

  const [inputHIni, setInputHIni] = useState<ISimplePeriodo[]>([]);
  const [inputHFin, setInputHFin] = useState([]);
  const [values, setValues] = React.useState<Selection>(new Set([]));

  const options = inputHIni.map((inputHIn) => ({
    label: `${inputHIn.hora_inicio.slice(0, -3)} - ${inputHIn.hora_fin.slice(
      0,
      -3
    )}`,
    value: inputHIn.id,
  }));

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const valores = e.target.value;
    const arrayNumeros = valores.split(",").map((numero) => numero.trim());
    setInputHFin(arrayNumeros);
    setValues(new Set(e.target.value.split(",")));
    console.log(values);
  };

  const getRangos = async (id: string, fecha: string) => {
    try {
      if (inputFecha != "" || fecha != "") {
        const dataToSend = {
          id_ambiente: id,
          fecha: fecha,
        };
        console.log(dataToSend);
        const respuesta = await axios.post<ISimplePeriodo[]>(
          "http://127.0.0.1:8000/api/disposicion/",
          dataToSend
        );
        const responseData = respuesta.data;
        const rangosHorario: string[] = [];
        console.log(responseData);
        responseData.forEach((objeto) => {
          const { hora_inicio, hora_fin } = objeto;
          const rangoHorario = `${hora_inicio} - ${hora_fin}`;
          rangosHorario.push(rangoHorario);
        });

        setInputHIni(responseData);
        console.log(responseData);
      } else {
        toast.error("Seleccione una fecha");
      }
    } catch (error) {
      console.error("Ocurrió un error al obtener los rangos horarios:", error);
      setInputHIni([]);
      // También puedes mostrar un mensaje de error al usuario si lo deseas
      toast.error("No se tienen horarios disponibles para ese dia");
    }
  };
  const verificar = async () => {
    if (inputFecha === "") toast.error("Seleccione una fecha");
    if (inputAmbiente === "") toast.error("Seleccione un ambiente");
  };

  //ENVIAR

  const createSolicitud = useSolicitudStore((state) => state.createSolicitud);

  const [oficial, setOficial] = useState([]);
  const onInputChangeSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (inputMateria === "") {
      toast.error("El campo Materia es obligatorio");
    } else if (inputNEst === "") {
      toast.error("El campo Número de estudiantes es obligatorio");
    } else if (inputFecha === "") {
      toast.error("El campo Fecha es obligatorio");
    } else if (inputMotivo === "") {
      toast.error("El campo Motivo es obligatorio");
    } else if (listGrupos.length === 0) {
      toast.error("El campo Grupo es obligatorio");
    } else if (inputAmbiente === "") {
      toast.error("El campo Ambiente es obligatorio");
    } else if (inputHFin.length === 0) {
      toast.error("Seleccione al menos un periodo para la reserva");
    } else {
      const fechaActual = new Date();
      const fechaSeleccionada = new Date(inputFecha);

      if (fechaSeleccionada > fechaActual) {
        console.log(listOficial.concat(listdocentes));
        console.log("lsita grupoa");
        console.log(listGrupos);
        console.log(listGrupos.length);
        if (listdocentes.length === 0 || listdocentes[0] === "") {
          await createSolicitud(
            inputMotivo,
            inputFecha,
            "Aceptado",
            parseInt(inputNEst),
            parseInt(inputMateria),
            listGrupos,
            parseInt(inputAmbiente),
            listOficial,
            inputHFin
          );
        } else {
          await createSolicitud(
            inputMotivo,
            inputFecha,
            "Pendiente",
            parseInt(inputNEst),
            parseInt(inputMateria),
            listGrupos,
            parseInt(inputAmbiente),
            listOficial.concat(listdocentes),
            inputHFin
          );
        }
      } else {
        toast.error(
          "La fecha seleccionada no es valida seleccione una fecha posterior a la de hoy."
        );
      }
    }
  };
  return (
    <div>
      <label className="text-3xl font-bold text-center text-gray-900">
        CREAR RESERVA
      </label>
      <form className="flex mt-5 space-y-6">
        <div className="mt-5 ml-5 mx-auto w-full sm:w-1/2 p-5">
          {/*DOCENTES */}

          <label className="text-ms text-gray-900">Docente:</label>
          <br />
          <span
            style={{ marginRight: "50px" }}
            className="text-ms text-gray-900"
          >
            {usuario.name} {usuario.apellidos}
          </span>

          <Select
            label="Docentes asociados a la reserva"
            selectionMode="multiple"
            placeholder="Seleccione docente"
            selectedKeys={valuesDocentes}
            className="mb-5 mt-5 w-full"
            onChange={handleSelectionChangeDocentes}
          >
            {optionsDocentes.map((docente) => (
              <SelectItem key={docente.value} value={docente.label}>
                {docente.label}
              </SelectItem>
            ))}
          </Select>
          <br />

          {/*MATERIA */}

          <label className="text-ms text-gray-900">Materia*:</label>
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

          {/*MOTIVO */}

          <label className="text-ms text-gray-900">Motivo*:</label>
          <br />
          <Select
            value={inputMotivo}
            className="w-full"
            aria-label="Selecciona una motivo"
            placeholder="Seleccione una opcion..."
            onChange={onInputChangeMotivo}
          >
            {motivosReserva.map((motivo) => (
              <SelectItem key={motivo} value={motivo}>
                {motivo}
              </SelectItem>
            ))}
          </Select>
          <br />

          {/*NUMERO DE ESTUDIANTES */}

          <label className="text-ms text-gray-900">Nro de personas*:</label>
          <Input
            type="number"
            value={inputNEst}
            className="w-full"
            style={{
              fontSize: "10px",
              padding: "20px",
            }}
            onChange={onInputChangeNEst}
            min="1"
          />
          <br />

          {/*GRUPO */}

          <label className="text-ms text-gray-900">Grupo*:</label>
          {/*<Select
            value={inputGrupo}
            onChange={onInputChangeGrupo}
            className="w-full text-gray-900"
            aria-label="Selecciona una grupo"
            placeholder="Seleccione una opcion..."
          >
            {grupos.map((grup) => (
              <SelectItem key={grup.id} textValue={grup.grupo}>
                {grup.grupo}
              </SelectItem>
            ))}
          </Select>*/}
          <Select
            label="Seleccione los grupos asociados a la materia "
            selectionMode="multiple"
            placeholder="Seleccione grupo"
            selectedKeys={valuesGrupos}
            className="mb-5 mt-5 w-full text-gray-900"
            onChange={handleSelectionChangeGrupos}
            onClick={verificarMateria}
          >
            {grupos.map((grupo) => (
              <SelectItem
                key={grupo.id}
                value={grupo.grupo}
                textValue={grupo.grupo}
              >
                {grupo.grupo}
              </SelectItem>
            ))}
          </Select>
          <br />
        </div>

        <div className="mt-10 ml-5 mx-auto w-full sm:w-1/2 p-5">
          {/*AMBIENTE */}

          <label className="text-ms text-gray-900">Ambiente*:</label>
          <br />
          <Select
            value={inputAmbiente}
            onChange={onInputChangeAmbiente}
            onClick={verificarCapacidad}
            className="w-full"
            aria-label="Selecciona una ambiente"
            placeholder="Seleccione una opcion..."
          >
            {optionsAmbiente.map((ambiente) => (
              <SelectItem
                className="text-smtext-xs"
                key={ambiente.value}
                value={ambiente.label}
              >
                {ambiente.label}
              </SelectItem>
            ))}
          </Select>
          <br />

          {/*FECHA */}

          <label className="text-ms text-gray-900">Fecha de reserva*:</label>
          <br />
          <DatePicker
            className="p-2 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Selecciona una fecha"
            onChange={handleDateChange}
          />
          <br />
          <label className="text-ms text-gray-900">Periodo/s*:</label>
          <br />

          {/*PERIODO */}

          <Select
            label="Periodos de reserva"
            selectionMode="multiple"
            placeholder="Seleccione periodo..."
            selectedKeys={values}
            className="mt-2 mb-5 w-full"
            onChange={handleSelectionChange}
            onClick={verificar}
          >
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
          <br />

          {/*BOTONES */}

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