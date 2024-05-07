import { useEffect, useState } from "react";
import { toast } from 'sonner';
import { Button, DatePicker, Input, Select, SelectItem } from "@nextui-org/react";
import { useSolicitudStore } from "../store/solicitud.store";
import axios from "axios";
import { ISimpleDocente } from '../interfaces/simple-docente';
import { ISimpleMateria } from "../interfaces/simple-materia";
import { ISimpleGrupo } from "../interfaces/simple-grupo";
import { ISimpleAmbiente } from "../../VerAmbientes/interfaces/simple-ambientes";
import { addMinutes, parse, format } from 'date-fns';

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
    const motivosReserva = [
      "Clase",
      "Taller",
      "Conferencia",
      'Examen',
      'Actividad extracurricular',
      'Presentación',
      'Seminario',
      'Ensayo',
      'Sesión de tutoría',
      'Prueba práctica',
      'Simposio',
      'Debate',
      'Jornada de capacitación',
      'Reunión de equipo',
      'Laboratorio práctico',
      'Trabajo en grupo',
      'Sesión de estudio',
      'Sesión informativa'
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
    const fechaActual = new Date();

    const fechaSeleccionada = new Date(fecha);
    if (fechaSeleccionada > fechaActual) {
      setInputFecha(fecha);
    console.log(inputFecha);
    } else {
      toast.error("La fecha seleccionada no es valida seleccione una fecha posterior a la de hoy.");
      console.log("La fecha seleccionada no es valida seleccione una fecha posterior a la de hoy.");
      setInputFecha(fecha);
    }
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
      getGrupos(2,id);
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



    const onInputChangeMotivo = async(e: React.ChangeEvent<HTMLSelectElement>) => {
        const inputValue = e.target as HTMLSelectElement;
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
          const fechaActual = new Date();
          const fechaSeleccionada = new Date(inputFecha);
          if (inicio <= fin ) {
            if(fechaSeleccionada > fechaActual){
 /*           const horaInicio = parse(inputHIni, 'H:mm', new Date());
            const horaFin = parse(inputHFin, 'H:mm', new Date());

            
            let horaActual = addMinutes(horaInicio, 45);

            do {
              const horasIntermedias= format(horaActual, 'H:mm');
              console.log('--------------------------------------');
              console.log(format(horaInicio, 'H:mm:ss'));
              console.log(typeof format(horaInicio, 'H:mm'));
              console.log(horasIntermedias);
              console.log(typeof horasIntermedias);
              console.log('--------------------------------------');
              const dataToSend = {
                id_ambiente: parseInt(inputAmbiente),
                hora_inicio: format(horaInicio, 'H:mm:ss'),
                hora_fin: `${horasIntermedias}:00`,
                fecha: inputFecha,
              };
              console.log(dataToSend);
              const response = await axios.post<{ message: string }>('http://127.0.0.1:8000/api/verDispo', dataToSend);
              const responseData = response.data;
              console.log(typeof response);
              console.log(response);
              console.log(typeof responseData);
              console.log(responseData);
              if(responseData.message.includes('Reservado')) return toast.error(`El rango ${horaInicio}a${horasIntermedias} esta reservado`);
              horaActual = addMinutes(horaActual, 45);
            } while (horaActual <= horaFin);
*/
            console.log(listdocentes)
            await createSolicitud( inputMotivo, inputFecha, inputHIni, inputHFin, 'Pendiente', parseInt(inputNEst),parseInt(inputMateria),parseInt(inputGrupo), parseInt(inputAmbiente),listdocentes);
            setInputMateria('1')
            setInputMotivo('');
            setInputNEst('');
            setInputGrupo('');
            setInputAmbiente('1');
            setInputFecha('');
            setInputHIni('06:45');
            setInputHFin('07:30');
          
          
          }else{
              toast.error("La fecha seleccionada no es valida seleccione una fecha posterior a la de hoy.");
            }
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
        <span style={{marginRight:'50px'}} className='text-ms text-gray-900'>{usuario.name} {usuario.apellidos}</span>
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
          className="w-full"
            aria-label="Selecciona una docente"
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
            onChange={onInputChangeMotivo}
          >
              {motivosReserva.map((motivo, index) => (
                <SelectItem  key={index} value={motivo}>
                  {motivo}
                </SelectItem >
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
          <label className='text-ms text-gray-900'>Grupo:</label>
          <Select 
            value={inputGrupo}
            onChange={onInputChangeGrupo}
            className="w-full"
            aria-label="Selecciona una grupo"
          >
            {grupos.map((grupo) => (
            <SelectItem key={grupo.id} value={grupo.id}>
              {grupo.grupo}
            </SelectItem>
          ))}
          </Select>
            <label className='text-ms text-gray-900'>Ambiente:</label>
            <br />
            <Select 
            value={inputAmbiente}
            onChange={onInputChangeAmbiente}
            className="w-full"
            aria-label="Selecciona una ambiente"
            >
              {ambientes.map((ambiente) => (
            <SelectItem key={ambiente.id} value={ambiente.id}>
              {ambiente.nombre}
            </SelectItem>
          ))}

            </Select>
            <br />
            <label className='text-ms text-gray-900'>Fecha de reserva:</label>
            <br />
            <DatePicker
            className="p-2 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Selecciona una fecha"
              onChange={handleDateChange}
            />
            <br />
            <label className='text-ms text-gray-900'>Horario de inicio:</label>
            <br />
            <Select 
            value={inputHIni}
            onChange={onInputChangeHIni}
            className="w-full"
            aria-label="6:45"
            placeholder="6:45"
            >
             {horasInicio.map((inputHIni, index) => (
          <SelectItem key={index} value={inputHIni}>{inputHIni}</SelectItem>
        ))}
            </Select>
            <br />
            <label className='text-ms text-gray-900'> Horario de fin:</label>
            <br />
            <Select 
            value={inputHFin}
            onChange={onInputChangeHFin}
            className="w-full"
            aria-label="7:30"
            placeholder="7:30"
            >
            {horasFin.map((inputHFin, index) => (
          <SelectItem key={index} value={inputHFin}>{inputHFin}</SelectItem>
        ))}
            </Select>
            <br />
            <div className='flex gap-5 items-center'>
        <Button  
        size="lg"
        className="w-full  mb-10"
        color="primary" >Cancelar</Button>
        <Button  
           onClick={onInputChangeSave}
           size="lg"
           className="w-full mb-10"
           color="primary"> Enviar </Button>
        </div>
        </div>
      </form>
    </div>
  );
};
