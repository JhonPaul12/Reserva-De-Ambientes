import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useSolicitudStore } from "../store/solicitud.store";
import axios from "axios";
import { ISimpleDocente } from "../interfaces/simple-docente";
import { ISimpleMateria } from "../interfaces/simple-materia";
import { ISimpleGrupo } from "../interfaces/simple-grupo";
import { ISimpleAmbiente } from "../../VerAmbientes/interfaces/simple-ambientes";
import React from "react";
import { ISimplePeriodo } from "../interfaces/simple-periodo";
import { ISimpleExcepcion } from "../interfaces/simple-exception";
import { useAuthStore } from "../../Login/stores/auth.store";

export const FormOrdenado = () => {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // getUsuario(user?.id);
    getMaterias();
    getExcepciones();
    if (listOficial.length === 0) {
      setListOficial([`${user?.id}`]);
    }
  }, []);

  //DOCENTES
  //const [usuario, setUsuario] = useState(instanciaInicial);

  type Selection = Set<string>;
  const [docentes, setDocentes] = useState<ISimpleDocente[]>([]);
  const [valuesDocentes, setValuesDocentes] = React.useState<Selection>(
    new Set<string>([])
  );
  const [listOficial, setListOficial] = useState<string[]>([]);
  const [listdocentes, setListDocentes] = React.useState<string[]>([]);

  /*const getUsuario = async (id: number) => {
    const respuesta = await axios.get(
      `http://127.0.0.1:8000/api/usuario/${id}`
    );
    console.log(respuesta.data);
    setUsuario(respuesta.data);
    console.log(user);
  };*/

  const docentesOrdenAlfabetico = [...docentes].sort((a, b) => {
    // Si a es null, lo ponemos al final
    if (a === null) return 1;
    // Si b es null, lo ponemos al final
    if (b === null) return -1;
    // Comparar por el campo 'name'
    return a.name.localeCompare(b.name);
  });

  const getDocentes = async (id: number) => {
    const respuesta = await axios.get(
      import.meta.env.VITE_API_URL +
        // `/api/docentesMismaMateria/${user?.id}/${id}`
        "/api/docentesMismaMateria/" +
        user?.id +
        "/" +
        id
    );
    const docentesArray = Object.values(respuesta.data).map(
      (item) => item as ISimpleDocente
    );
    console.log(docentesArray);
    setDocentes(docentesArray);
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
    getGrupos(parseInt(inputMateria), arrayNumeros);
  };

  const optionsDocentes = docentesOrdenAlfabetico
    .filter((docente) => docente !== null) // Filtrar los valores null
    .map((docente) => ({
      label: `${docente.name} ${docente.apellidos}`,
      value: docente.id,
    }));

  //MATERIA

  const [inputMateria, setInputMateria] = useState("");
  const [materias, setMaterias] = useState<ISimpleMateria[]>([]);

  const getMaterias = async () => {
    const respuesta = await axios.get(
      // import.meta.env.VITE_API_URL + `/api/usuario/materias/${user?.id}/`
      import.meta.env.VITE_API_URL + "/api/usuario/materias/" + user?.id
    );
    setMaterias(respuesta.data);
  };

  const onInputChangeMateria = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target as HTMLSelectElement;
    console.log(value);
    setInputMateria(value);
    getDocentes(parseInt(value));
    getGrupos(parseInt(value), listdocentes);
  };
  const verificarMateriaDoc = async () => {
    if (inputMateria === "")
      toast.error("Seleccione una materia para ver a los docentes asociados");
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = event.charCode;
    // Allow only numbers (charCode 48-57)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  const onInputChangeNEst = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;

    if (inputValue.value.length < 6) {
      if (inputValue.value === "0") {
        e.preventDefault();
        return;
      }
      setInputNEst(inputValue.value);
      getAmbientes(inputValue.value);
    } else {
      toast.error("El numero de estudiantes no debe superar los 5 caracteres");
      console.log("El numero de estudiantes no debe superar los 5 caracteres");
    }
  };

  //GRUPO

  const [grupos, setGrupos] = useState<ISimpleGrupo[]>([]);
  const [listGrupos, setListGrupos] = useState<string[]>([]);
  const [valuesGrupos, setValuesGrupos] = React.useState<Selection>(
    new Set([])
  );

  /*const getGrupos = async (materia_id: number) => {
    try {
      // Obtener los grupos para el docente principal
      const respuestaPrincipal = await axios.get(
        `http://127.0.0.1:8000/api/gruposMateria/${materia_id}`
      );
      setGrupos(respuestaPrincipal.data);
    } catch (error) {
      console.error("Error al obtener los grupos:", error);
    }
  };*/

  const getGrupos = async (materia_id: number, docente_id: string[]) => {
    try {
      // Obtener los grupos para el docente principal
      const respuestaPrincipal = await axios.get(
        // import.meta.env.VITE_API_URL + `/api/docentes/${user?.id}/${materia_id}`
        import.meta.env.VITE_API_URL +
          "/api/docentes/" +
          user?.id +
          "/" +
          materia_id
      );
      setGrupos(respuestaPrincipal.data);
      let gruposTem = respuestaPrincipal.data;

      console.log("Grupos del docente principal:", gruposTem);

      console.log(docente_id.length);
      if (docente_id.length !== 0) {
        const solicitudes = docente_id.map((docente) =>
          axios.get<ISimpleGrupo[]>(
            import.meta.env.VITE_API_URL +
              // `/api/docentes/${docente}/${materia_id}`
              "/api/docentes/" +
              docente +
              "/" +
              materia_id
          )
        );

        //Esperar a que todas las solicitudes se completen
        const respuestas = await Promise.all(solicitudes);
        console.log(respuestas);

        //Extraer los datos de cada respuesta y unirlos a la lista de grupos
        respuestas.forEach((respuesta) => {
          gruposTem = [...gruposTem, ...respuesta.data];
        });

        console.log("Grupos de todos los docentes:", gruposTem);
      }

      // Actualizar el estado con la lista unida de grupos
      setGrupos(gruposTem);
      console.log("Estado actualizado con los grupos:", gruposTem);
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
    const respuesta = await axios.get(
      // import.meta.env.VITE_API_URL + `/api/ambientesLibres`
      import.meta.env.VITE_API_URL + "/api/ambientesLibres"
    );
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
        "Por favor, complete el campo Nro de personas para ver la lista de ambientes disponibles con la capacidad adecuada."
      );
    if (inputNEst != "" && ambientes.length === 0)
      toast.error(
        "No existen ambientes DISPONIBLES con capacidad apta para el numero de personas requerido"
      );
    console.log(ambientes);
  };

  //FECHA

  const [inputFecha, setInputFecha] = useState("");
  const [excepciones, setExcepciones] = useState<ISimpleExcepcion[]>([]);

  const getExcepciones = async () => {
    // const respuesta = await axios.get(`http://127.0.0.1:8000/api/excepcion`);
    const respuesta = await axios.get(
      import.meta.env.VITE_API_URL + "/api/excepcion"
    );
    setExcepciones(respuesta.data);
    console.log(respuesta.data);
  };
  const handleDateChange = async (
    date: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(date);

    //const fecha = `${date.year.toString()}-${date.month.toString()}-${date.day.toString()}`;
    const fecha = date.target.value;
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
  const [inputHFin, setInputHFin] = React.useState<string[]>([]);
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
        // const respuesta = await fetch(
        //   // "http://127.0.0.1:8000/api/disposicion/",
        //   import.meta.env.VITE_API_URL + "/api/disposicion/",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(dataToSend),
        //   }
        // );
        const respuesta = await axios.post(
          // "http://127.0.0.1:8000/api/disposicion/",
          import.meta.env.VITE_API_URL + "/api/disposicion/",
          dataToSend
        );
        const responseData = await respuesta.data;
        const rangosHorario: string[] = [];
        console.log(responseData);
        responseData.forEach(
          (objeto: { hora_inicio: string; hora_fin: string }) => {
            const { hora_inicio, hora_fin } = objeto;
            const rangoHorario = `${hora_inicio} - ${hora_fin}`;
            rangosHorario.push(rangoHorario);
          }
        );

        setInputHIni(responseData);
        console.log(responseData);
      } else {
        toast.error("Seleccione una fecha");
      }
    } catch (error) {
      console.error("Ocurrió un error al obtener los rangos horarios:", error);
      setInputHIni([]);
      // También puedes mostrar un mensaje de error al usuario si lo deseas
      toast.error("No se tienen horarios disponibles para esta fecha");
    }
  };
  const verificar = async () => {
    if (inputFecha === "") toast.error("Seleccione una fecha");
    if (inputAmbiente === "") toast.error("Seleccione un ambiente");
  };

  //ENVIAR

  const createSolicitud = useSolicitudStore((state) => state.createSolicitud);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const onInputChangeSave = async (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    if (inputMateria === "") {
      toast.error("El campo Materia es obligatorio");
      setIsButtonDisabled(false);
    } else if (inputNEst === "") {
      toast.error("El campo Número de estudiantes es obligatorio");
      setIsButtonDisabled(false);
    } else if (inputFecha === "") {
      toast.error("El campo Fecha es obligatorio");
      setIsButtonDisabled(false);
    } else if (inputMotivo === "") {
      toast.error("El campo Motivo es obligatorio");
      setIsButtonDisabled(false);
    } else if (listGrupos.length === 0) {
      toast.error("El campo Grupo es obligatorio");
      setIsButtonDisabled(false);
    } else if (inputAmbiente === "") {
      toast.error("El campo Ambiente es obligatorio");
      setIsButtonDisabled(false);
    } else if (inputHFin.length === 0) {
      toast.error("Seleccione al menos un periodo para la reserva");
      setIsButtonDisabled(false);
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
            "Aceptada",
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
            "Aceptada",
            parseInt(inputNEst),
            parseInt(inputMateria),
            listGrupos,
            parseInt(inputAmbiente),
            listOficial.concat(listdocentes),
            inputHFin
          );
        }
        /*

        try {
          await axios.post(
            `http://127.0.0.1:8000/api/notificacion`,
            {
              id_usuario: user?.id,
              id_solicitud: id_solicitud,
              titulo: tituloNotificacion,
              contenido: descripcionNotificacion,
              visto: 1,
            }
          );
        } catch (error) {
          console.error(
            `Error al enviar notificaciones ${id_solicitud}: ${error}`
          );
        }*/
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(
          "La fecha seleccionada no es valida seleccione una fecha posterior a la de hoy."
        );
      }
    }
  };
  const onInputChangeCancelar = async () => {
    window.location.reload();
  };
  return (
    <div>
      <label className="text-3xl font-bold text-center text-gray-900 ml-5">
        SOLICITAR RESERVA
      </label>
      <form
        className="mt-5 space-y-6 md:space-y-0 md:space-x-6"
        onSubmit={onInputChangeSave}
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mb-6 md:mb-0 mr-5 ml-5">
            {/*DOCENTES */}

            <label className="text-ms text-gray-900">Docente:</label>
            <br />
            <span
              style={{ marginRight: "50px" }}
              className="text-ms text-gray-900 mb-5"
            >
              {user?.name} {user?.apellidos}
            </span>
            <br />

            {/*MATERIA */}

            <label className="text-ms text-gray-900 mt-5">Materia*:</label>
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

            <label className="text-ms text-gray-900">
              Docentes asociados*:
            </label>
            <br />

            <Select
              label=""
              selectionMode="multiple"
              placeholder="Seleccione docente..."
              selectedKeys={valuesDocentes}
              className="mb-1 mt-3 w-full"
              onChange={handleSelectionChangeDocentes}
              onClick={verificarMateriaDoc}
            >
              {optionsDocentes.map((docente) => (
                <SelectItem key={docente.value} value={docente.label}>
                  {docente.label}
                </SelectItem>
              ))}
            </Select>
            <br />

            {/*GRUPO */}

            <label className="text-ms text-gray-900">Grupo*:</label>
            <Select
              label="Seleccione los grupos asociados a la materia "
              selectionMode="multiple"
              placeholder="Seleccione grupo"
              selectedKeys={valuesGrupos}
              className="mb-5 mt-2 w-full text-gray-900"
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
          </div>

          <div className="w-full md:w-1/2 ml-5">
            {/*NUMERO DE ESTUDIANTES */}

            <label className="text-ms text-gray-900">Nro de personas*:</label>
            <Input
              type="text"
              value={inputNEst}
              placeholder="Ingrese un número..."
              onChange={onInputChangeNEst}
              onKeyPress={handleKeyPress}
              style={{
                fontSize: "13px",
              }}
            />
            <br />
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
            {/*FECHA 
          <DatePicker
            className="p-2 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Selecciona una fecha"
            onChange={handleDateChange}
          />
          <br />*/}
            <Input
              name="fecha feriado"
              type="date"
              fullWidth
              size="lg"
              className="mb-3"
              label=""
              value={inputFecha}
              onChange={handleDateChange}
            ></Input>

            {/*PERIODO */}

            <label className="text-ms text-gray-900">Periodo/s*:</label>
            <br />

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
              <Button
                size="lg"
                className="w-full  mb-10"
                color="danger"
                variant="light"
                onClick={onInputChangeCancelar}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                onClick={onInputChangeSave}
                size="lg"
                className="w-full mb-10"
                color="primary"
                disabled={isButtonDisabled}
              >
                {" "}
                {isButtonDisabled ? "Procesando..." : "Enviar"}{" "}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
