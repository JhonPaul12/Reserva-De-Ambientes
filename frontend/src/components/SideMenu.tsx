import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { IoLogoPolymer } from "react-icons/io";
import { Link, Outlet, useLocation } from "react-router-dom";

import "./sideMenu.css";

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
  const [open, setOpen] = useState(true);
  const [submenuStates, setSubmenuStates] = useState<Record<number, boolean>>(
    {}
  );

  const location = useLocation();

  const toggleSubmenu = (index: number) => {
    setSubmenuStates((prevState: Record<number, boolean>) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // const toggleSubmenu = (index: number) => {
  //   // Cierra todos los submenús abiertos
  //   const newSubmenuStates = { ...submenuStates };
  //   Object.keys(newSubmenuStates).forEach((key) => {
  //     newSubmenuStates[parseInt(key)] = false;
  //   });

  //   // Abre el submenú correspondiente al índice proporcionado
  //   newSubmenuStates[index] = !submenuStates[index];

  //   setSubmenuStates(newSubmenuStates);
  // };
  return (
    <div className="flex text-blanco ">
      <div className="bg-azul  ">
        <div
          className={`p-5 pt-8 min-h-screen relative ${
            open ? "w-[300px]" : "w-20"
          } duration-700 `}
        >
          <BsArrowLeftShort
            className={`bg-blanco text-azul text-3xl rounded-full absolute -right-3 top-9 border border-azul cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />

          {/* Logo */}
          <div className="sidemenu__logo">
            <IoLogoPolymer className="text-7xl max-w-[80px] min-w-[50px]" />
            <div className="leading-[.5]">
              <h1 className={`font-bold text-2xl ${!open && "scale-0"}`}>
                Steel
              </h1>
              <p className={`text-sm font-light ${!open && "scale-0"}`}>
                Gestion de Ambientes
              </p>
            </div>
          </div>

          {/* Opciones del menu */}
          <div className="pt-4  ">
            {/* Opciones */}
            <ul className="space-y-4  ">
              {sideMenuOptions.map((option, index) => (
                <li key={option.path}>
                  {option.submenu ? (
                    <div
                      className="sidemenu__link "
                      onClick={() => toggleSubmenu(index)}
                      title={option.name}
                    >
                      <span>{option.icon}</span>
                      <span className={`${!open && "scale-0"}`}>
                        {option.name}
                      </span>
                      {/* <BsChevronDown /> */}
                    </div>
                  ) : (
                    <Link
                      to={option.path}
                      className={`sidemenu__link ${
                        location.pathname.includes(option.path) &&
                        "sidemenu__link--active"
                      }`}
                      title={!open ? option.name : ""}
                    >
                      <span>{option.icon}</span>
                      <span className={`${!open && "scale-0"}`}>
                        {option.name}
                      </span>
                    </Link>
                  )}
                  {option.submenu && submenuStates[index] && (
                    <ul className="px-6 ">
                      {option.subMenuOptions?.map((subOption) => (
                        <li key={subOption.path}>
                          <Link className="sidemenu__link" to={subOption.path}>
                            <span>{subOption.icon}</span>
                            <p className={`${!open && "scale-0"}`}>
                              {subOption.name}
                            </p>
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
