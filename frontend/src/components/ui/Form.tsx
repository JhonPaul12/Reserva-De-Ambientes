
import React from 'react';
import './Form.css';
import { Calendar } from 'react-bootstrap-icons'
export const Form = () => {
  
  return (
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
        <label>Horario*:   </label>
        <Calendar style={{ width: '50px', height: '50px' } }/>
        <br />
        <button type="button" >Guardar</button>
        <button type="button" >Cancelar</button>
        </div>
      </form>
    )
}