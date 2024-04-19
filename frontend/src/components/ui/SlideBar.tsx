import React, { useState } from 'react'
import './SlideBar.css';
import { slideBarAdmin } from '../../lib/constants.tsx';
import {Link, useLocation } from "react-router-dom"
export const SlideBar = () => { 
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleMenuToggle = () => {
    setMenuOpen(true);
  };
  return (
    <aside className="menu-lateral">
        <div>
        <h3>RESERVA <br /> DE <br />AMBIENTES</h3>
        </div>
        <ul>
         {
          slideBarAdmin.map(option => (
            <li key={ option.path }>
              <Link to={{ pathname: option.path}}
                style={{ textDecoration: 'none', color: 'inherit' }}>
                <button 
                  className={`itemMenu${(location.pathname).includes(option.path) && 'active'}`}
                  onMouseOver={handleMenuToggle}>
                <span style={{ marginRight: '20px' }}>{option.icon}</span>
                {option.name}
                </button>
              </Link>
            </li>
           ))
          }
        </ul>
      </aside>
  )
}