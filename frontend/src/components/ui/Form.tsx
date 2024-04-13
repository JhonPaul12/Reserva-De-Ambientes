
import React, {useState} from 'react';
import './Form.css';
import { Calendar } from 'react-bootstrap-icons'
import { toast } from 'sonner';
import { useAmbienteStore } from '../../store/ambientes/ambientes.store';


export const Form = () => {

  const [isLoading, setLoading] = useState(false);
  const createAmbiente = useAmbienteStore( state => state.createAmbiente )
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();

    setLoading(true);
  
  const { nombre, capacidad, ubicacion, tipoAmbiente, horario } = e.target as HTMLFormElement


  if(nombre.value.trim()=== '' || capacidad.value.trim()=== '' ){
    toast.error('Es necesario llenar al menos el nombre y la capacidad del ambiente para registrarlo')
    setLoading(false);
    return;
  }
};
  return (
    <div className='contenedor'>
     <form onSubmit={handleSubmit}>
        <div className="columna">
        <label>Nombre*:</label>
        <input name='nombre'/>
        <br />
        <label>Capacidad*:</label>
        <input name='capacidad'/>
        <br />
        
        <label>Ubicación:</label>
        <input name='ubicacion'/>
        <br />
       
        </div>
        <div className="columna">
        <label>Tipo:</label>
        <br />
        <select name='tipoAmbiente'>
          <option value="">Seleccionar tipo</option>
          <option value="Multifuncional">Multifuncional</option>
          <option value="Aula">Aula</option>
          <option value="Laboratorio">Laboratorio</option>
        </select>
        <br />
        <label style={{ marginRight:'40px' } }>Horario*:   </label>
        <button className='cuadrado'>
        <Calendar style={{ width: '50px', height: '50px' } }/>
        </button>
        
        <br />
        <div className='opcions'>
        <button className="cancelar" >Cancelar</button>
        <button className="guardar" type="submit">Guardar</button>
        </div>
        
        </div>
      </form>
    </div>
    
    )
  }
