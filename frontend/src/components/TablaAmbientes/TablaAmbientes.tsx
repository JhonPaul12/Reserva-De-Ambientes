import React from "react";
import "./tabla.css";
import { Outlet, useNavigate } from "react-router-dom";


export const TablaAmbientes = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
   navigate('/listaAmbientes/horarios');
  }
  return (
      <div className="page-container">
        <h2 className="titulo">LISTA DE AMBIENTES</h2>
        <div className="center-content">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Aula</th>
                <th>Capacidad</th>
                <th>Ubicacion</th>
                <th>Disponibilidad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>624</td>
                <td>100</td>
                <td>Edificio Nuevo</td>
                <td><button onClick={handleButtonClick} className = "btn">Horarios</button></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <Outlet/>
      </div>
  );
};
