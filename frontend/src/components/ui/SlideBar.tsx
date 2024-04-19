import React, { useState } from 'react'
import './SlideBar.css';
import { slideBarAdmin } from '../../lib/constants.tsx';
import {Link, useLocation } from "react-router-dom"
export const SlideBar = () => { 
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const handleMouseOut = () => {
    setMenuOpen( false);
  };
  return (
    <aside className="menu-lateral">
        <div>
        <h3>RESERVA <br /> DE <br />AMBIENTES</h3>
        </div>
        <ul
        className='principalBar'>
        {slideBarAdmin.map(option => (
          <li key={option.path}>
            {option.subOptions ? (
              <>
                <button 
                  className={`itemMenu${(location.pathname) === option.path ? 'active' : 'false'}`} 
                  onMouseOver={handleMenuToggle}>
                  <span style={{ marginRight: '20px' }}>{option.icon}</span>
                  {option.name}
                </button>
                {menuOpen && (
                  <ul className="subMenu">
                    {option.subOptions.map(subOption => (
                      <li key={subOption.path}>
                        <Link to={{ pathname: subOption.path }} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <button className={`itemSubMenu${(location.pathname).includes(subOption.path) && 'active'}`}>
                          {subOption.name}
                        </button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link to={{ pathname: option.path }} style={{ textDecoration: 'none', color: 'inherit' }}>
                <button className={`itemMenu${(location.pathname).includes(option.path) && 'active'}`}>
                  <span style={{ marginRight: '20px' }}>{option.icon}</span>
                  {option.name}
                </button>
              </Link>
            )}
          </li>
        ))}
      </ul>
      </aside>
  )
}