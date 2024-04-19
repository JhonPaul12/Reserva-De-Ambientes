import React from 'react'
import './ListaAceptadas.css'

export const ListaAceptadas = () => {
    return (
      <div className="pag">
        <h2 className="titulo">SOLICITUDES ACEPTADAS</h2>
        <div className="center-content">
          <table>
            <thead>
              <tr>
                <th>AMBIENTE</th>
                <th>H. INICIO</th>
                <th>H. FINAL</th>
                <th>FECHA</th>
                <th>NRO. EST</th>
                <th>MOTIVO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>692B</td>
                <td>6:45</td>
                <td>8:15</td>
                <td>15/03/2024</td>
                <td>60</td>
                <td>Examen</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
            <tbody>
                <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
}
