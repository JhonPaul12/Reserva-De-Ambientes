import { useState } from "react";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import { IoLogoPolymer } from "react-icons/io";
import { Link, Outlet, useLocation } from "react-router-dom";
interface SideMenuProps {
  sideMenuOptions: {
    path: string;
    name: string;
    icon: React.ReactNode;
    submenu?: boolean;
    subMenuOptions?: { path: string; name: string }[];
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

  return (
    <div className="flex text-blanco  ">
      <div className="bg-azul ">
        <div
          className={` bg-azul h-screen p-5 pt-8 relative ${
            open ? "w-72" : "w-20"
          } duration-300 `}
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
          <div className="pt-2">
            {/* Opciones */}
            <ul className="space-y-4">
              {sideMenuOptions.map((option, index) => (
                <li key={option.path}>
                  {option.submenu ? (
                    <div
                      className="sidemenu__link"
                      onClick={() => toggleSubmenu(index)}
                    >
                      <span>{option.icon}</span>
                      <span className={`${!open && "scale-0"}`}>
                        {option.name}
                      </span>
                      <BsChevronDown />
                    </div>
                  ) : (
                    <Link
                      to={option.path}
                      className={`sidemenu__link ${
                        location.pathname.includes(option.path) &&
                        "sidemenu__link--active"
                      }`}
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
                        <li className="sidemenu__link" key={subOption.path}>
                          <Link to={subOption.path}>{subOption.name}</Link>
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
