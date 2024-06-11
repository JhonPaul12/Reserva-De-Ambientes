import {
    Button,
  } from "@nextui-org/react";
  import "./Header.css";
  import { IoLogoPolymer } from "react-icons/io";
  import { useNavigate } from "react-router-dom";
  
  

  
  export const HeaderIni = () => {
    const navigate = useNavigate();
  
    const handleAction = async () => {
        navigate("/login");
      };
  
    return (
      <div className="flex bg-azul p-3 max-h-[15vh] ">
        <div className="flex text-blanco mt-5  ">
          {/* Logo */}
          <div className="sidemenu__logo ml-3 mt-5">
            <IoLogoPolymer className="text-7xl max-w-[80px] min-w-[50px]" />
            <div className="leading-[.5] ml-3">
              <h1 className={`font-bold text-3xl`}>Steel Code</h1>
              <p className={`text-sm font-light`}>Gestion de Ambientes</p>
            </div>
          </div>
        </div>
        <div className=" ml-auto mt-5">
            <Button
              className="my-auto"
              onClick={handleAction}
            >
              Iniciar sesión
            </Button>
          
        </div>
      </div>
    );
  };

