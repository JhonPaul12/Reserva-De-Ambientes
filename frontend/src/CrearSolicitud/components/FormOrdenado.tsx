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

export const FormOrdenado = () => {
  useEffect(() => {
    const id = 2;
    getUsuario(id);
    getDocentes();
    getMaterias(id);
    getAmbientes();
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
  const [valuesDocentes, setValuesDocentes] = React.useState<Selection>(new Set([]));
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
  
  const handleSelectionChangeDocentes = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  /*
  const [selects, setSelects] = useState([]);
  const [listdocentes, setListDocentes] = useState([]);

  const getUsuario = async (id: number) => {
    const respuesta = await axios.get(
      `http://127.0.0.1:8000/api/usuario/${id}`
    );
    console.log(respuesta.data);
    setUsuario(respuesta.data);
    console.log(usuario);
  };
  const getDocentes = async () => {
    const respuesta = await axios.get(`http://127.0.0.1:8000/api/usuario/`);
    setDocentes(respuesta.data);
  };

  const docentesOrdenAlfabetico = [...docentes].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const botonAnadirClick = async () => {
    const limiteSelects = 5;
    if (selects.length < limiteSelects) {
      const ultimoSelect = selects[selects.length - 1];
      if (selects.length ===0 || ultimoSelect.value!= '') {
      setSelects((prevSelects) => [
        ...prevSelects,
        { id: prevSelects.length, value: "" },
      ]);
      }else{
        toast.error("Seleccione un docente antes de añadir otro");
      }
    } else {
      toast.error("Se ha alcanzado el límite de docentes");
    }
  };

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    selectId
  ) => {
    const { value } = event.target as HTMLSelectElement;

    console.log(selectId);
    if (!listdocentes.includes(value) || listdocentes.length===1) {
      setSelects((prevSelects) =>
        prevSelects.map((select) =>
          select.id === selectId ? { ...select, value } : select
        )
      );
      anadir(value);
    } else {
      toast.error("El docente ya está presente en la lista:", value);
      setSelects((prevSelects) =>
        prevSelects.map((select) =>
          select.id === selectId ? { ...select, value: "" } : select
        )
      );
    }
    console.log(value);
  };

  const anadir = async (id: string) => {
      console.log(listdocentes);
    console.log(usuario.id);
    if (!listdocentes.includes(id)) {
      setListDocentes([...listdocentes, id]);
      console.log("ID añadido:", id);
      console.log(typeof id);
      console.log(id);
      console.log(typeof listdocentes);
      console.log(listdocentes);
    } else {
      toast.error("El docente ya está presente en la lista:", id);
    }
  };*/

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
    getGrupos(parseInt(value), 2);
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
    console.log(inputValue.value)
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

  const getGrupos = async (materia_id: number, docente_id: number) => {
    const respuesta = await axios.get(
      `http://127.0.0.1:8000/api/docentes/${docente_id}/${materia_id}`
    );
    setGrupos(respuesta.data);
  };

  const onInputChangeGrupo = async (event) => {
    setInputGrupo(event.target.value);
    console.log(event.target.value);
  };

  //AMBIENTE

  const [inputAmbiente, setInputAmbiente] = useState("");
  const [ambientes, setAmbientes] = useState<ISimpleAmbiente[]>([]);

  const getAmbientes = async () => {
    const respuesta = await axios.get(`http://127.0.0.1:8000/api/ambiente/`);
    setAmbientes(respuesta.data);
    console.log(inputFecha);
  };

  const onInputChangeAmbiente = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target as HTMLSelectElement;
    console.log(inputHIni);
    console.log(value);
    setInputAmbiente(value);
    if(inputHIni.length!= 0 || inputFecha !='') {
      setInputHIni([]);
      console.log('pasa');
      console.log(inputFecha);
      getRangos(value,inputFecha);
    }
    //Deveriamos verificar si la fecha no esta vacia
    //getRangos(inputFecha);
    console.log(inputAmbiente);
  };

  //FECHA

  const [inputFecha, setInputFecha] = useState("");

  const handleDateChange = async (date) => {
    console.log(date);

    const fecha = `${date.year.toString()}-${date.month.toString()}-${date.day.toString()}`;
    const fechaActual = new Date();

    const fechaSeleccionada = new Date(fecha);
    if (fechaSeleccionada > fechaActual) {
      setInputFecha(fecha);
      console.log(fecha);
      console.log(inputFecha);
      
      if(inputAmbiente==='') {
        toast.error('Seleccione un ambiente') 
        return;
      }else{
        await getRangos(inputAmbiente,fecha);
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

  const getRangos = async (id:string, fecha: string) => {
    try {
      if (inputFecha!='' || fecha!='') {
        
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
      }else{
        toast.error('Seleccione una fecha')
      }
      
    } catch (error) {
      console.error("Ocurrió un error al obtener los rangos horarios:", error);
      setInputHIni([]);
      // También puedes mostrar un mensaje de error al usuario si lo deseas
      toast.error("No se tienen horarios disponibles para ese dia");
    }
  };
  const verificar = async()=>{
    if(inputFecha==='') toast.error('Seleccione una fecha')
    if(inputAmbiente==='')toast.error('Seleccione un ambiente')
  }

  //ENVIAR

  const createSolicitud = useSolicitudStore((state) => state.createSolicitud);
  
  const [oficial,setOficial] = useState([]);
  const onInputChangeSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (inputMotivo === "") {
      toast.error("El campo Motivo es obligatorio");
    } else if (inputNEst === "") {
      toast.error("El campo Número de estudiantes es obligatorio");
    } else if (inputFecha === "") {
      toast.error("El campo Fecha es obligatorio");
    } else if (inputMateria === "") {
      toast.error("El campo Materia es obligatorio");
    } else if (inputGrupo === "") {
      toast.error("El campo Grupo es obligatorio");
    } else if (inputAmbiente === "") {
      toast.error("El campo Ambiente es obligatorio");
    } else if (inputHFin.length === 0) {
      toast.error("Debe seleccionar al menos un horario de fin");
    } else {
      const fechaActual = new Date();
      const fechaSeleccionada = new Date(inputFecha);
    
      if (fechaSeleccionada > fechaActual) {
        console.log(listOficial.concat(listdocentes));
        console.log(listOficial);
        console.log(listdocentes);
        console.log(listdocentes.length);
        if(listdocentes.length === 0 || listdocentes[0] === '' ){
          await createSolicitud(
            inputMotivo,
            inputFecha,
            "Pendiente",
            parseInt(inputNEst),
            parseInt(inputMateria),
            parseInt(inputGrupo),
            parseInt(inputAmbiente),
            listOficial,
            inputHFin
          );
        }else{
          await createSolicitud(
            inputMotivo,
            inputFecha,
            "Pendiente",
            parseInt(inputNEst),
            parseInt(inputMateria),
            parseInt(inputGrupo),
            parseInt(inputAmbiente),
            listOficial.concat(listdocentes),
            inputHFin
          );
        }
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
  return (
    <div>
      <label className="text-3xl font-bold text-center text-gray-900">
        CREAR SOLICITUD
      </label>
      <form className="mt-5 space-y-6">
        <div className="columnaR">
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
          {/*<button
            type="button"
            className="flex justify-center rounded-md bg-azul p-5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={botonAnadirClick}
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
              {docentesOrdenAlfabetico.map((docente) => (
                <SelectItem key={docente.id} textValue={docente.name}>
                  {docente.name} {docente.apellidos}
                </SelectItem>
              ))}
            </Select>
          ))}*/}
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

          <label className="text-ms text-gray-900">Nro Est*:</label>
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

          {/*GRUPO */}

          <label className="text-ms text-gray-900">Grupo*:</label>
          <Select
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
          </Select>
          <br />

          {/*AMBIENTE */}

          <label className="text-ms text-gray-900">Ambiente*:</label>
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
