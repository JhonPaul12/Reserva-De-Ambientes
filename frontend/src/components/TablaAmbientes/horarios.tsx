import React from 'react'

export const Horarios = () => {
  return (
    <div className="page-container">
        <h2 className="titulo">Lista de Horarios</h2>
        <div className="center-content">
          <table>
            <thead>
              <tr>
                <th>Dia</th>
                <th>Horario Inicio</th>
                <th>Horario Fin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12/02/24</td>
                <td>15:45</td>
                <td>17:15</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  )
}
