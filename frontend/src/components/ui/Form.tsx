
import React, {useState} from 'react';
import './Form.css';
import { Calendar } from 'react-bootstrap-icons'
import { toast } from 'sonner';
import { useAmbienteStore } from '../../store/ambientes/ambientes.store.ts';


export const Form = () => {


  const [inputName, setInputName] = useState('');
  const [inputCap, setInputCap] = useState('');
  const [inputUbi, setInputUbi] = useState('');
  const [inputType, setInputType] = useState('');
  const [inputHora, setInputHora] = useState(false);
  const [buttonSave, setInputSave] = useState(false);

  /*const [isLoading, setLoading] = useState(false);
  const createAmbiente = useAmbienteStore( state => state.createAmbiente */
  /*const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();

    setLoading(true);
  
if(nombre.value.trim()=== '' || capacidad.value.trim()=== '' ){
    toast.error('Es necesario llenar al menos el nombre y la capacidad del ambiente para registrarlo')
    setLoading(false);
    return;
  }
    
  const { nombre, capacidad, ubicacion, tipoAmbiente, horario } = e.target as HTMLFormElement

*/
  const onInputChangeName = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <30) {
      setInputName(inputValue);
      console.log(inputValue);
    } else {
      toast.error('El nombre del ambiente debe tener como maximo 30 caracteres');
      console.log("El nombre del ambiente debe tener como maximo 30 caracteres");
    }
  }
  
  const onInputChangeCap = (event) => {
    const inputValue = event.target.value;
  if (inputValue.length <= 5) {
    if (!isNaN(inputValue)) {
        setInputCap(inputValue);
        console.log(inputValue);
      } else {
        toast.error('La capacidad debe expresarse numericamente');
        console.log("La capacidad debe expresarse numericamente");
      }
    } else {
      toast.error('La capacidad debe tener más de 5 caracteres numericos');
      console.log("La capacidad debe tener más de 5 caracteres numericos");
    }
  }

  const onInputChangeUbi = (event) => {
    const inputValue = event.target.value;
  if (inputValue.length <= 150) {
        setInputUbi(inputValue);
        console.log(inputValue);
    } else {
      toast.error('La ubicacion del ambiente debe tener como maximo 150 caracteres');
      console.log("La ubicacion del ambiente debe tener como maximo 150 caracteres");
    }
  }

  const onInputChangeType = (event) => {
    const inputValue = event.target.value;
        setInputType(inputValue);
        console.log(inputValue);
  }
  const onInputChangeHora = (event) => {
        setInputHora(true);
        console.log('true');
  }

  const onInputChangeSave = (event) => {
    event.preventDefault();
    if (inputName !== '' || inputCap !== '') {
      setInputSave(true);
      console.log('true');
    } else {
      toast.error('El campo Nombre y capacidad son obligatorios');
      console.log('El campo Nombre y capacidad son obligatorios');
    }
}
  return (
    <div className='contenedor'>
     <form>
        <div className="columna">
        <label>Nombre*:</label>
        <input 
            type='text'
            value={inputName}
            style={{
              textAlign: 'center', 
              fontSize: '16px', 
              padding: '10px', 
            }}
            onChange={onInputChangeName}
          />
        <br />
        <label>Capacidad*:</label>
        <input 
            type='text'
            value={inputCap}
            style={{
              textAlign: 'center', 
              fontSize: '16px', 
              padding: '10px', 
            }}
            onChange={onInputChangeCap}
          />
        <br />
        
        <label>Ubicación:</label>
        <textarea 
            value={inputUbi}
            style={{
              fontSize: '16px', 
              padding: '20px', 
    
            }}
            onChange={onInputChangeUbi}
          />
        <br />
       
        </div>
        <div className="columna">
        <label>Tipo:</label>
        <br />
        <select 
              value={inputType}
            onChange={onInputChangeType}
          >
          <option value="">Seleccionar tipo</option>
          <option value="Multifuncional">Multifuncional</option>
          <option value="Aula">Aula</option>
          <option value="Laboratorio">Laboratorio</option>
        </select>
        <br />
        <label style={{ marginRight:'40px' } }>Horario*:   </label>
        <button 
            className='cuadrado'
            onClick={onInputChangeHora}
          >
        <Calendar style={{ width: '50px', height: '50px' } }/>
        </button>
        
        <br />
        <div className='opcions'>
        <button className="cancelar" >Cancelar</button>
        <button 
          className="guardar"
          onClick={onInputChangeSave}>Guardar</button>
        </div>
        
        </div>
      </form>
    </div>
    
    )
  }
