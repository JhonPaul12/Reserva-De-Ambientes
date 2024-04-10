
import React from 'react';
import './Form.css';
import { Calendar } from 'react-bootstrap-icons'
export const Form = () => {
  
  return (
    <div className='contenedor'>
     <form>
        <div className="columna">
        <label>Nombre*:</label>
        <input />
        <br />
        <label>Capacidad*:</label>
        <input/>
        <br />
        
        <label>Ubicación:</label>
        <input/>
        <br />
       
        </div>
        <div className="columna">
        <label>Tipo:</label>
        <br />
        <select>
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
        <button className="guardar" >Guardar</button>
        </div>
        
        </div>
      </form>
    </div>
    
    )
}