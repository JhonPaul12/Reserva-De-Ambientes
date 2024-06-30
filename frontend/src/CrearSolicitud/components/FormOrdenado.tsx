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
import { ModalAmbientes } from "./ModalAmbientes";

export const FormOrdenado = () => {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // getUsuario(user?.id);
    getMaterias();
    getExcepciones();
    getAmbientes();
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
        "/api/docentesMismaMateria/" +
        user?.id +
        "/" +
        id
      // `http://127.0.0.1:8000/api/docentesMismaMateria/${user?.id}/${id}`
    );
    const docentesArray = Object.values(respuesta.data).map(
      (item) => item as ISimpleDocente
    );
    console.log(docentesArray);
    if (docentesArray.length === 0) {
      setListDocentes([]);
    }
    setDocentes(docentesArray);
  };

  const handleSelectionChangeDocentes = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const valores = e.target.value;
    const arrayNumeros = valores
      .split(",")
      .map((numero) => numero.trim())
      .filter((value) => value !== "");
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
      // `http://127.0.0.1:8000/api/usuario/materias/${user?.id}/`
      import.meta.env.VITE_API_URL + "/api/usuario/materias/" + user?.id
    );
    setMaterias(respuesta.data);
  };

  // const onInputChangeMateria = async (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const { value } = e.target as HTMLSelectElement;
  //   console.log(value);
  //   setInputMateria(value);
  //   getDocentes(parseInt(value));
  //   setValuesGrupos(new Set([]));
  //   getGrupos(parseInt(value), listdocentes);
  // };
  const onInputChangeMateria = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target as HTMLSelectElement;
    console.log(value);
    setInputMateria(value);

    // Limpiar los estados relacionados con docentes y grupos
    setDocentes([]);
    setValuesDocentes(new Set([]));
    setListDocentes([]);

    // Limpiar los grupos
    setGrupos([]);
    setValuesGrupos(new Set([]));
    setListGrupos([]);

    // Obtener nuevos docentes para la materia seleccionada
    await getDocentes(parseInt(value));

    // Obtener grupos para la materia seleccionada
    // Pasamos un array vacío como segundo argumento para obtener todos los grupos de la materia
    await getGrupos(parseInt(value), []);
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

      if (inputAmbientes.length !== 0)
        verificarCapacidad(inputAmbientes, parseInt(inputValue.value));
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
        // `http://127.0.0.1:8000/api/docentes/${user?.id}/${materia_id}`
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
            // `http://127.0.0.1:8000/api/docentes/${docente}/${materia_id}`
            import.meta.env.VITE_API_URL +
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
    if (e.target.value !== "") {
      const valores = e.target.value;
      const arrayNumeros = valores.split(",").map((numero) => numero.trim());
      console.log(arrayNumeros);
      setListGrupos(arrayNumeros);
      setValuesGrupos(new Set(e.target.value.split(",")));
    } else {
      // Maneja el caso cuando se deselecciona el último elemento
      setListGrupos([]);
      setValuesGrupos(new Set());
    }
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
    console.log(fechaSeleccionada);
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
        /*if (inputAmbientes.length === 0) {
          toast.error("Seleccione un ambiente");
          return;
        } else {
          console.log("llego rangos de fecha");
          await getRangos(inputAmbientes, fecha);
        }*/
        console.log(inputHFin);
        getRangos(inputHFin, fecha);
      }
    } else {
      toast.error(
        "La fecha seleccionada no es valida seleccione una fecha posterior a la de hoy."
      );
      setInputFecha(fecha);
    }
  };

  //PERIODO

  const [inputHIni, setInputHIni] = useState<ISimplePeriodo[]>([]);
  const [inputHFin, setInputHFin] = React.useState<string[]>([]);
  const [values, setValues] = React.useState<Selection>(new Set([]));

  const horarios = [
    ["06:45:00", "07:30:00"],
    ["07:30:00", "08:15:00"],
    ["08:15:00", "09:00:00"],
    ["09:00:00", "09:45:00"],
    ["09:45:00", "10:30:00"],
    ["10:30:00", "11:15:00"],
    ["11:15:00", "12:00:00"],
    ["12:00:00", "12:45:00"],
    ["12:45:00", "13:30:00"],
    ["13:30:00", "14:15:00"],
    ["14:15:00", "15:00:00"],
    ["15:00:00", "15:45:00"],
    ["15:45:00", "16:30:00"],
    ["16:30:00", "17:15:00"],
    ["17:15:00", "18:00:00"],
    ["18:00:00", "18:45:00"],
    ["18:45:00", "19:30:00"],
    ["19:30:00", "20:15:00"],
    ["20:15:00", "21:00:00"],
    ["21:00:00", "21:45:00"],
  ];

  const options = horarios.map((inputHIn) => ({
    label: `${inputHIn[0].slice(0, -3)} - ${inputHIn[1].slice(0, -3)}`,
    value: inputHIn[0],
  }));

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    if (e.target.value !== "") {
      const valores = e.target.value;
      const arrayNumeros = valores.split(",").map((numero) => numero.trim());
      setInputHFin(arrayNumeros);
      setValues(new Set(e.target.value.split(",")));
      console.log(values);
      console.log(arrayNumeros);
      getRangos(arrayNumeros, inputFecha);
      console.log(inputHFin);
    } else {
      setInputHFin([]);
      setValues(new Set());
      setInputAmbientes([]);
      setValuesAmbientes(new Set());
    }
  };

  const verificar = async () => {
    if (inputFecha === "") toast.error("Seleccione una fecha");
    //if (inputAmbientes.length === 0) toast.error("Seleccione un ambiente");
  };

  //AMBIENTE
  interface Option {
    label: string;
    value: number;
  }
  const [inputAmbiente, setInputAmbiente] = useState("");
  const [ambientes, setAmbientes] = useState<ISimpleAmbiente[]>([]);
  const [inputAmbientes, setInputAmbientes] = React.useState<string[]>([]);
  const [valuesAmbientes, setValuesAmbientes] = React.useState<Selection>(
    new Set([])
  );
  const [listAmb, setlistAmb] = React.useState<Option[]>([]);
  const [ambienteLibres, setambienteLibres] = useState<ISimplePeriodo[]>([]);
  const getRangos = async (periodos: string[], fecha: string) => {
    try {
      if (inputFecha != "" || fecha != "") {
        if (periodos.length !== 0) {
          const dataToSend = {
            fecha: fecha,
            horarios: periodos,
          };
          console.log(dataToSend);
          const respuesta = await axios.post(
            // import.meta.env.VITE_API_URL + "/api/libresComunes/",
            "http://127.0.0.1:8000/api/libresPorHorarios",
            // "http://steelcode.tis.cs.umss.edu.bo/api/libresPorHorarios",
            dataToSend
          );
          const ambienteLibresObj = respuesta.data.periodos_libres;
          setambienteLibres(Object.values(ambienteLibresObj));
          const aux: ISimplePeriodo[] = Object.values(ambienteLibresObj);
          console.log(ambienteLibres);
          const optionsAm = aux.map((ambiente) => ({
            label: `${ambiente.nombre} (Cap: ${
              ambiente.capacidad
            }, ${ambiente.hora_inicio.slice(0, -3)}-${ambiente.hora_fin.slice(
              0,
              -3
            )}) `,
            value: ambiente.id,
          }));
          console.log(optionsAm);
          setlistAmb(optionsAm);
        }
      } else {
        toast.error("Seleccione una fecha");
      }
    } catch (error) {
      console.error("Ocurrió un error al obtener los ambientes:", error);
      setInputHIni([]);
      setValuesAmbientes(new Set());
      if (inputHFin.length !== 0) {
        toast.error(
          "No se tienen ambientes disponibles para este periodo, consulte otro rango"
        );
      }
    }
  };

  const getAmbientes = async () => {
    const respuesta = await axios.get(
      // `http://127.0.0.1:8000/api/ambientesLibres`
      import.meta.env.VITE_API_URL + "/api/ambientesLibres"
    );
    //const filteredAmbientes = respuesta.data.filter(
    //  (ambiente: ISimpleAmbiente) => ambiente.capacidad >= parseInt(num)
    //);
    setAmbientes(respuesta.data);
    console.log(respuesta.data);
    //console.log(filteredAmbientes);
  };

  /*const optionsAmbientes = periAmb.map((ambiente) => ({
    label: `${ambiente.nombre} (Cap: ${ambiente.capacidad}, ${ambiente.hora_inicio}) `,
    value: ambiente.id_ambiente,
  }));*/

  const onInputChangeAmbiente = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    //const { value } = e.target as HTMLSelectElement;
    //console.log(inputHIni);
    //console.log(value);
    console.log(e.target.value);
    const valores = e.target.value;

    if (valores !== "") {
      const arrayNumeros = valores.split(",").map((numero) => numero.trim());
      setInputAmbientes(arrayNumeros);
      verificarCapacidad(arrayNumeros, parseInt(inputNEst));
      setValuesAmbientes(new Set(e.target.value.split(",")));
      console.log(arrayNumeros);
      console.log(inputAmbiente);
    } else {
      setInputAmbientes([]);
      setValuesAmbientes(new Set());
    }

    if (inputHIni.length != 0 || inputFecha != "") {
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
      }
    }
    //Deveriamos verificar si la fecha no esta vacia
    //getRangos(inputFecha);
    console.log(inputAmbientes);
  };
  const verificarCapacidad = async (
    selectedAmbientes: string[],
    cap: number
  ) => {
    const periodosAm = ambienteLibres.filter((periodo) =>
      selectedAmbientes.includes(periodo.id.toString())
    );

    // Agrupar periodos por id_ambiente
    const periodosPorAmbiente = periodosAm.reduce((acc, periodo) => {
      if (!acc[periodo.id_ambiente]) {
        acc[periodo.id_ambiente] = [];
      }
      acc[periodo.id_ambiente].push(periodo);
      console.log(acc);
      return acc;
    }, {} as Record<number, ISimplePeriodo[]>);

    // Calcular capacidad total teniendo en cuenta los periodos consecutivos
    let capacidadTotal = 0;

    for (const id_ambiente in periodosPorAmbiente) {
      const periodos = periodosPorAmbiente[id_ambiente];
      periodos.sort((a, b) => (a.hora_inicio > b.hora_inicio ? 1 : -1)); // Ordenar por hora_inicio
      console.log(periodos);
      let capacidadSumada = false;
      for (let i = 0; i < periodos.length; i++) {
        console.log(i);
        console.log(capacidadSumada);
        if (i > 0 && periodos[i].hora_inicio === periodos[i - 1].hora_fin) {
          console.log("pasa cap");
          continue;
        }
        capacidadSumada = true;
        capacidadTotal += periodos[i].capacidad;
        console.log(capacidadTotal);
      }
    }

    console.log(capacidadTotal);
    console.log(inputNEst);
    if (capacidadTotal < cap) {
      setInputAmbiente(
        "Advertencia: La capacidad total de los ambientes seleccionados no es suficiente."
      );
      showToast();
      //openModal();
    } else {
      setInputAmbiente("");
    }

    if (inputNEst != "" && ambientes.length === 0)
      toast.error(
        "No existen ambientes DISPONIBLES con capacidad apta para el numero de personas requerido"
      );
    console.log(ambientes);
  };

  const [isToastShown, setIsToastShown] = useState(false);

  const showToast = () => {
    if (!isToastShown) {
      toast.info(
        "<div>" +
          "<p>Al seleccionar un mismo ambiente en <strong>horarios consecutivos</strong>, la capacidad se calcula como si un mismo grupo usara el ambiente en todo el tiempo consecutivo reservado.</p>" +
          "<p>Por ejemplo:</p>" +
          "<ul>" +
          "<li>Si seleccionas el ambiente <strong>690A</strong> de <strong>8:15 a 9:00</strong> y de <strong>9:00 a 09:45</strong>, la capacidad total del ambiente será <strong>calculada una sola vez</strong>, ya que se asume que el mismo grupo está usando el ambiente durante todo el período de <strong>8:15 a 09:45</strong>.</li>" +
          "<li>Esto significa que, aunque hayas reservado múltiples periodos consecutivos, la capacidad del ambiente no se suma para cada periodo, sino que se considera la capacidad del ambiente durante todo el tiempo reservado.</li>" +
          "</ul>" +
          "</div>",
        {
          position: "top-center",
          style: {
            fontSize: "10px", // Tamaño de letra
            backgroundColor: "#FFE5CC", // Color de fondo
            color: "#333333", // Color del texto
          },
        }
      );
      setIsToastShown(true);
    }
  };

  const verificarAmbiente = async () => {
    if (inputHFin.length === 0) {
      setlistAmb([]);
      toast.error("Seleccione periodos para consultar la disponibilidad");
    }
    getRangos(inputHFin, inputFecha);
    console.log(valuesAmbientes);
    console.log(listAmb);
    if (ambientes.length === 0)
      toast.error("No existen ambientes disponibles para reservas");
  };

  //const [modalOpen, setModalOpen] = useState(false);
  //const openModal = () => {
  //setModalOpen(true);
  //};

  //ENVIAR

  const createSolicitud = useSolicitudStore((state) => state.createSolicitud);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const eliminarElementosVacios = (array: string[]): string[] => {
    return array.filter((item) => item.trim() !== "");
  };

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
    } else if (inputAmbientes.length === 0) {
      toast.error("El campo Ambiente es obligatorio");
      setIsButtonDisabled(false);
    } else if (inputHFin.length === 0) {
      toast.error("Seleccione al menos un periodo para la reserva");
      setIsButtonDisabled(false);
    } else {
      const periodosSinElementosVacios =
        eliminarElementosVacios(inputAmbientes);

      const periodosAm = ambienteLibres.filter((periodo) =>
        periodosSinElementosVacios.includes(periodo.id.toString())
      );

      const idsAmbienteUnicos = new Set();
      const idsAmbiente = periodosAm
        .filter((periodo) => {
          if (!idsAmbienteUnicos.has(periodo.id_ambiente)) {
            idsAmbienteUnicos.add(periodo.id_ambiente);
            return true;
          }
          return false;
        })
        .map((periodo) => periodo.id_ambiente.toString());
      console.log(idsAmbiente);

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
            idsAmbiente,
            listOficial,
            periodosSinElementosVacios
          );
        } else {
          await createSolicitud(
            inputMotivo,
            inputFecha,
            "Aceptada",
            parseInt(inputNEst),
            parseInt(inputMateria),
            listGrupos,
            idsAmbiente,
            listOficial.concat(listdocentes),
            periodosSinElementosVacios
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

  // const prueba = () => {
  //   console.log(inputMotivo);
  //   console.log(inputFecha);
  //   console.log(inputNEst);
  //   console.log(inputMateria);
  //   console.log(inputAmbiente);
  //   console.log(inputHIni);
  //   console.log(inputHFin);
  //   console.log(listGrupos);
  //   console.log(listOficial);
  //   console.log(listdocentes);
  // };
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

            <label className="text-ms font-bold text-gray-900">Docente:</label>
            <br />
            <span
              style={{ marginRight: "50px" }}
              className="text-ms text-gray-900 mb-5"
            >
              {user?.name} {user?.apellidos}
            </span>
            <br />

            {/*MATERIA */}

            <label className="text-ms font-bold text-gray-900 mt-5">
              Materia*:
            </label>
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

            <label className="text-ms font-bold text-gray-900">
              Docentes asociados*:
            </label>
            <br />

            <Select
              label=""
              aria-label="Selecciona un docente"
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

            <label className="text-ms font-bold text-gray-900">Grupo*:</label>
            <Select
              label="Seleccione los grupos asociados a la materia "
              aria-label="Selecciona un grupo"
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

            <label className="text-ms  font-bold text-gray-900">Motivo*:</label>
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

          <div className="w-full md:w-1/2 ml-3">
            {/*NUMERO DE ESTUDIANTES */}

            <label className="text-ms font-bold text-gray-900">
              Nro de personas*:
            </label>
            <Input
              type="text"
              value={inputNEst}
              label="Ingrese un número..."
              onChange={onInputChangeNEst}
              onKeyPress={handleKeyPress}
              style={{
                fontSize: "13px",
              }}
            />
            <br />

            {/*FECHA */}

            <label className="text-ms  font-bold text-gray-900">
              Fecha de reserva*:
            </label>
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
              className=""
              label=""
              value={inputFecha}
              onChange={handleDateChange}
            ></Input>

            <ModalAmbientes fecha={inputFecha}></ModalAmbientes>
            {/* Agrego icono a su izquierda */}

            {/*PERIODO 

            <label className="text-ms text-gray-900">Periodo/s*:</label>
            <br />*/}

            <Select
              label="Periodos a consultar..."
              selectionMode="multiple"
              placeholder="Seleccione periodos..."
              selectedKeys={values}
              className="mt-2 mb-5 w-full "
              onChange={handleSelectionChange}
              onClick={verificar}
              style={{
                fontSize: "20px",
              }}
            >
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            <br />

            {/*AMBIENTE */}

            <label className="text-ms  font-bold text-gray-900">
              Ambiente y periodo a reservar*:
            </label>
            <br />
            <Select
              label=""
              aria-label="Selecciona un ambiente"
              selectionMode="multiple"
              placeholder="Seleccione ambiente..."
              selectedKeys={valuesAmbientes}
              className="mt-2 w-full"
              onChange={onInputChangeAmbiente}
              onClick={verificarAmbiente}
            >
              {listAmb.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            <p style={{ color: "#FFA500", fontSize: "9px" }}>{inputAmbiente}</p>
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
                //disabled={isButtonDisabled}
              >
                {" "}
                {isButtonDisabled ? "Procesando..." : "Enviar"}{" "}
              </Button>

              {/* <Button onClick={prueba}></Button> */}
            </div>
          </div>
        </div>
      </form>
      {/*
      <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          size="3xl"
        >
          <ModalContent className="modal-content-large">
            <ModalHeader>
              Advertencia
            </ModalHeader>
            <ModalBody>
              <div>
                Considerar que al seleccionar un mismo ambiente en horarios consecutivos, la capacidad se calcula como si un mismo grupo usara el ambiente en todo el tiempo consecutivo reservado.
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="shadow" onClick={() => setModalOpen(false)}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>*/}
    </div>
  );
};
