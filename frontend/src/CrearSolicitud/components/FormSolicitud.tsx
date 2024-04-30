import { useEffect, useState } from "react";
import { toast } from 'sonner';
import { DatePicker } from "@nextui-org/react";
import { useSolicitudStore } from "../store/solicitud.store";
import axios from "axios";
import { ISimpleDocente } from '../interfaces/simple-docente';
import { ISimpleMateria } from "../interfaces/simple-materia";
import { ISimpleGrupo } from "../interfaces/simple-grupo";
import { ISimpleAmbiente } from "../../VerAmbientes/interfaces/simple-ambientes";

export const FormSolicitud = () => {

    // Constantes de horas de inicio y fin
    const horasInicio = [
      "06:45",
      "07:30",
      "08:15",
      "09:00",
      "09:45",
      "10:30",
      "11:15",
      "12:00",
      "12:45",
      "13:30",
      "14:15",
      "15:00",
      "15:45",
      "16:30",
      "17:15",
      "18:00",
      "18:45",
      "19:30",
      "20:15",
      "21:00"
    ];
    
    const horasFin = [
      "07:30",
      "08:15",
      "09:00",
      "09:45",
      "10:30",
      "11:15",
      "12:00",
      "12:45",
      "13:30",
      "14:15",
      "15:00",
      "15:45",
      "16:30",
      "17:15",
      "18:00",
      "18:45",
      "19:30",
      "20:15",
      "21:00",
      "21:45"
    ];
    
    const instanciaInicial: ISimpleDocente = {
      id: 0, // Pon el valor que necesites aquí
      name: '',
      apellidos: '',
      telefono: '',
      codigo_sis: '',
      email: '',
      email_verified_at: null
    };
    const [inputMateria, setInputMateria] = useState('1');
    const [inputMotivo, setInputMotivo] = useState('');
    const [inputNEst, setInputNEst] = useState('');
    const [inputGrupo, setInputGrupo] = useState('');
    const [inputAmbiente, setInputAmbiente] = useState('1');
    const [inputFecha, setInputFecha] = useState('');
    const [inputHIni, setInputHIni] = useState('06:45');
    const [inputHFin, setInputHFin] = useState('07:30');
    const [docentes, setDocentes] = useState<ISimpleDocente[]>([]);
    const [materias, setMaterias] = useState<ISimpleMateria[]>([]);
    const [grupos, setGrupos] = useState<ISimpleGrupo[]>([]);
    const [ambientes, setAmbientes] = useState<ISimpleAmbiente[]>([]);
    const [usuario, setUsuario] = useState(instanciaInicial);
    const [selects, setSelects] = useState([]);
    const [listdocentes, setListDocentes] = useState([]);


    const createSolicitud = useSolicitudStore( state => state.createSolicitud);




    const sortedOptions = [...docentes].sort((a, b) => (a.name).localeCompare(b.name));

    const anadir = async(id: string) => {
      setListDocentes([...listdocentes, id]);
      
      console.log(listdocentes)
    };
    const handleDateChange = (date) => {
    console.log(date);
    const fecha = `${date.year.toString()}-${date.month.toString()}-${date.day.toString()}`;
      setInputFecha(fecha);
    console.log(inputFecha);
  };

    const handleClick = async() => {
      setSelects((prevSelects) => [...prevSelects, { id: prevSelects.length, value: '' }]);
    };
  
    const handleSelectChange = async(event: React.ChangeEvent<HTMLSelectElement>, selectId) => {
      const { value } = event.target as HTMLSelectElement;
      setSelects((prevSelects) =>
        prevSelects.map((select) => (select.id === selectId ? { ...select, value } : select))
      );
      
      console.log(selectId)
      anadir(value);
      console.log(value)
    };


  

    useEffect(() => {
      const id = 2;
      getUsuario(id);
      getDocentes();
      getMaterias(id);
      getAmbientes();
      anadir(`${id}`);
    }, []);
  
    const getDocentes = async () => {
      const respuesta = await axios.get(`http://127.0.0.1:8000/api/usuario/`);
      setDocentes(respuesta.data);
    };
    const getMaterias = async (id: number) => {
      const respuesta = await axios.get(`http://127.0.0.1:8000/api/usuario/materias/${id}/`);
      setMaterias(respuesta.data);
    };
    const getGrupos = async (materia_id:number, docente_id: number) => {
      const respuesta = await axios.get(`http://127.0.0.1:8000/api/docentes/${docente_id}/${materia_id}`);
      setGrupos(respuesta.data);
    };
    const getAmbientes = async () => {
      const respuesta = await axios.get(`http://127.0.0.1:8000/api/ambiente/`);
      setAmbientes(respuesta.data);
      console.log(inputFecha);
    };
    const getUsuario = async (id: number) => {
      const respuesta = await axios.get(`http://127.0.0.1:8000/api/usuario/${id}`);
      console.log(respuesta.data);
      setUsuario(respuesta.data);
      console.log(usuario);
    };



    const onInputChangeMateria = async(e: React.ChangeEvent<HTMLSelectElement>) => {
      const {value} = e.target as HTMLSelectElement;
      console.log(value)
      setInputMateria(value);
      getGrupos(parseInt(value), 2)
    }
    const onInputChangeGrupo = async(e: React.ChangeEvent<HTMLSelectElement>) => {
      const inputValue = e.target as HTMLSelectElement;
      setInputGrupo(inputValue.value);
    }
    const onInputChangeAmbiente =async(e: React.ChangeEvent<HTMLSelectElement>) => {
      const {value} = e.target as HTMLSelectElement;
      setInputAmbiente(value);
    }
    const onInputChangeHIni =async(e: React.ChangeEvent<HTMLSelectElement>) => {
      const inputValue = e.target as HTMLSelectElement;
      setInputHIni(inputValue.value);
      console.log(inputHIni);
    }
    const onInputChangeHFin = async(e: React.ChangeEvent<HTMLSelectElement>) => {
      const inputValue = e.target as HTMLSelectElement;
      setInputHFin(inputValue.value);
      console.log(inputHFin);
    }



    const onInputChangeMotivo = async(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target as HTMLTextAreaElement;
        if (inputValue.value.length <30) {
          setInputMotivo(inputValue.value);
        } else {
          toast.error('El motivo debe tener como maximo 150 caracteres');
          console.log("El motivo debe tener como maximo 150 caracteres");
        }
      }
      const onInputChangeNEst = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target as HTMLInputElement;
        if (inputValue.value.length <6) {
          if (!isNaN(parseInt(inputValue.value))) {
            setInputNEst(inputValue.value);
          } else {
            setInputNEst('');
            toast.error('El numero de estudiantes debe expresarse numericamente');
            console.log("El numero de estudiantes debe expresarse numericamente");
          }
        } else {
            setInputNEst('');
          toast.error('El numero de estudiantes no debe superar los 5 caracteres');
          console.log("El numero de estudiantes no debe superar los 5 caracteres");
        }
      }


      const onInputChangeSave = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    
        if (inputMotivo !== '' && inputNEst !== '' && inputFecha!== '' && inputHIni!== '' && inputHFin!== '' && inputMateria!== '' && inputGrupo!== '' && inputAmbiente!== '') {
          console.log(inputHIni);
          console.log(inputFecha);
          const inicio = new Date(`2000-01-01T${inputHIni}`);
          const fin = new Date(`2000-01-01T${inputHFin}`);
          console.log(inicio);
          console.log(fin);
          // Comparar los horarios
          if (inicio <= fin) {
            console.log(listdocentes)
            await createSolicitud( inputMotivo, inputFecha, inputHIni, inputHFin, 'Pendiente', parseInt(inputNEst),parseInt(inputMateria),parseInt(inputGrupo), parseInt(inputAmbiente),listdocentes);
           
          }else{
            toast.error("El horario de inicio es mayor al final, introduzca un rango correcto");
          }
        } else {
    
          toast.error('Todos los campos son obligatorios');
          console.log('Todos los campos son obligatorios');
        }
    }

  return (
    <div>
      <label className="text-3xl font-bold text-center text-gray-900">
        CREAR SOLICITUD
      </label>
      <form className="mt-5 space-y-6">
        <div className="columnaR">
        <label className='text-ms text-gray-900'>Docente:</label>
        <br />
        <span style={{marginRight:'50px'}} className='text-ms text-gray-900'>{usuario.name}</span>
        <button
        type="button"
        className="flex justify-center rounded-md bg-azul p-5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleClick}
        >
          Añadir docente
        </button>
        {selects.map((select) => (
        <select
          key={select.id}
          value={select.value}
          onChange={(event) => handleSelectChange(event, select.id)}
          className="mt-5 h-full w-full rounded-md border-3 bg-gray-300 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lm"
        >
          {sortedOptions.map((docente) => (
            <option key={docente.id} value={docente.id}>
              {docente.name}
            </option>
          ))}
        </select>
      ))}
          <br />
          <label className="text-ms text-gray-900">Materia:</label>
          <br />
          <select 
            value={inputMateria}
            className='h-full w-full rounded-md border-3 bg-gray-300 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lm  '
            onChange={onInputChangeMateria}
          >
            {materias.map((materia) => (
            <option key={materia.id} value={materia.id}>
              {materia.nombre_materia}
            </option>
          ))}
          </select>
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
          <label className='text-ms text-gray-900'>Grupo:</label>
          <select 
            value={inputGrupo}
            onChange={onInputChangeGrupo}
            className='h-full w-full rounded-md border-3 bg-gray-300 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lm  '
          >
            {grupos.map((grupo) => (
            <option key={grupo.id} value={grupo.id}>
              {grupo.grupo}
            </option>
          ))}
          </select>
            <label className='text-ms text-gray-900'>Ambiente:</label>
            <br />
            <select 
            value={inputAmbiente}
            onChange={onInputChangeAmbiente}
            className='h-full w-full rounded-md border-3 bg-gray-300 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lm  '

            >
              {ambientes.map((ambiente) => (
            <option key={ambiente.id} value={ambiente.id}>
              {ambiente.nombre}
            </option>
          ))}

            </select>
            <br />
            <label className='text-ms text-gray-900'>Fecha de reserva:</label>
            <br />
            <DatePicker
              aria-label="Selecciona una fecha"
              onChange={handleDateChange}
            />
            <br />
            <label className='text-ms text-gray-900'>Horario de inicio:</label>
            <br />
            <select 
            value={inputHIni}
            onChange={onInputChangeHIni}
            className='h-full w-full rounded-md border-3 bg-gray-300 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lm  '
            >
             {horasInicio.map((inputHIni, index) => (
          <option key={index} value={inputHIni}>{inputHIni}</option>
        ))}
            </select>
            <br />
            <label className='text-ms text-gray-900'> Horario de fin:</label>
            <br />
            <select 
            value={inputHFin}
            onChange={onInputChangeHFin}
            className='h-full w-full rounded-md border-3 bg-gray-300 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lm  '

            >
            {horasFin.map((inputHFin, index) => (
          <option key={index} value={inputHFin}>{inputHFin}</option>
        ))}
            </select>
            <br />
            <div className='opcions'>
        <button 
        className="mt-10 flex w-full justify-center rounded-md bg-azul p-5  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Cancelar</button>
        <button 
           onClick={onInputChangeSave}
          className="mt-2 mb-5 flex w-full justify-center rounded-md bg-azul p-5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Enviar</button>
        </div>
        </div>
      </form>
    </div>
  );
};
