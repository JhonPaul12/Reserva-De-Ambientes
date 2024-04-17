import React, { useState } from 'react';
import { toast } from 'sonner';
import './FormSolicitud.css';
import { Calendario } from '../index.ts';


export const FormSolicitud = () => {
    const [inputMotivo, setInputMotivo] = useState('');
    const [inputNEst, setInputNEst] = useState('');
    const [buttonSave, setInputSave] = useState(false);



    const onInputChangeMotivo = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <30) {
          setInputMotivo(inputValue);
          console.log(inputValue);
        } else {
          toast.error('El motivo debe tener como maximo 150 caracteres');
          console.log("El motivo debe tener como maximo 150 caracteres");
        }
      }
      const onInputChangeNEst = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <6) {
          setInputNEst(inputValue);
          console.log(inputValue);
        } else {
          toast.error('El numero de estudiantes no debe superar los 5 caracteres');
          console.log("El numero de estudiantes no debe superar los 5 caracteres");
        }
      }

      const onInputChangeSave = (event) => {
        event.preventDefault();
        if (inputMotivo !== '' && inputNEst !== '') {
          setInputSave(true);
          console.log('true');
        } else {
          toast.error('El motivo y el nro de estudiantes son obligatorios');
          console.log('l motivo y el nro de estudiantes son obligatorios');
        }
    }
  return (
    <div className='contenedor'>
    <form>
        <div className="columna">
        <label>Docente:</label>
        <br />
        <select 
          >

          </select>
          <br />
          <label>Materia:</label>
          <br />
          <select 
          >

          </select>
        <br />
        <label>Motivo:</label>
        <br />
        <textarea 
            value={inputMotivo}
            style={{
              fontSize: '16px', 
              padding: '20px', 
    
            }}
            onChange={onInputChangeMotivo}
          />
        <br />
        <label>Nro Est:</label>
        <input  
            value={inputNEst}
            style={{
              fontSize: '10px', 
              padding: '20px', 
            }}
            onChange={onInputChangeNEst}
          />
          <label>Grupo:</label>
          <select 
          >

          </select>
        </div>
        <div className="columna">
            <label>Ambiente:</label>
            <br />
            <select 
            >

            </select>
            <br />
            <label>Fecha de reserva:</label>
            <br />
            <Calendario/>
            <br />
            <label>Horario de inicio:</label>
            <br />
            <select 
            >

            </select>
            <br />
            <label>Horario de fin:</label>
            <br />
            <select 
            >

            </select>
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


