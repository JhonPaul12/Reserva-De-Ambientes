import React from 'react'
import './SlideBar.css';
export const SlideBar = () => {

  return (
    <div className="menu-lateral">
        <h3>RESERVA <br /> DE <br />AULAS</h3>
        <ul>
          <li><button type="button" >INICIO</button></li>
          <li><button type="button" >SOLICITUDES</button></li>
          <li><button type="button" >DOCENTES</button></li>
          <li><button type="button" >AMBIENTES</button></li>
        </ul>
      </div>
  )
}
export default SlideBar;