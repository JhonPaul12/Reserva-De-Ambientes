import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

import "./sideMenu.css";

//Interface Menu Props
interface SideMenuProps {
  sideMenuOptions: {
    path: string;
    name: string;
    icon: React.ReactNode;
    submenu?: boolean;
    subMenuOptions?: { path: string; name: string; icon: React.ReactNode }[];
  }[];
}

export const SideMenu: React.FC<SideMenuProps> = ({ sideMenuOptions }) => {
  const [submenuStates, setSubmenuStates] = useState<Record<number, boolean>>(
    {}
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleSubmenu = (index: number) => {
    setSubmenuStates((prevState: Record<number, boolean>) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="flex text-blanco ">
      {/* Menu hamburguesa */}
      <div className="mobile-menu-icon pt-5" onClick={() => setMenuOpen(!menuOpen)}>
        <FiMenu color="white" />
      </div>
      <div className={`bg-azul ${menuOpen ? "block" : "menu-hidden"} sm:block`}>
        <div className={`p-5 relative sm:w-[290px] min-h-[85vh] `}>
          <div>
            {/* Opciones */}
            <ul className="sm:space-y-4">
              {sideMenuOptions.map((option, index) => (
                <li key={option.path}>
                  {option.submenu ? (
                    <div
                      className="sidemenu__link"
                      onClick={() => toggleSubmenu(index)}
                      title={option.name}
                    >
                      <span>{option.icon}</span>
                      <span>{option.name}</span>
                    </div>
                  ) : (
                    <Link
                      to={option.path}
                      className={`sidemenu__link ${
                        location.pathname.includes(option.path) &&
                        "sidemenu__link--active"
                      }`}
                      title={option.name}
                    >
                      <span>{option.icon}</span>
                      <span>{option.name}</span>
                    </Link>
                  )}
                  {option.submenu && submenuStates[index] && (
                    <ul className="sm:px-6">
                      {option.subMenuOptions?.map((subOption) => (
                        <li key={subOption.path}>
                          <Link className="sidemenu__link" to={subOption.path}>
                            <span>{subOption.icon}</span>
                            <p>{subOption.name}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};
