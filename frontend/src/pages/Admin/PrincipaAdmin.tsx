import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Login/stores/auth.store";

export const PrincipalAdmin = () => {
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();
  
    const handleAction = async () => {
        navigate("/admin/reservas");
      };
  return (
    <>
    
    <div className="text-center sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="mt-10">
      <h1 className="text-azul text-4xl mb-3 font-bold">¡Bienvenid@ {user?.name}! </h1>
      <h1 className="text-lg text-azul font-semibold"> Mantén la organización al máximo</h1>
      <h1 className="text-lg text-azul" >Revisa las reservas realizadas y gestiona los horarios de los ambientes</h1>
      <div className="relative inset-0">
      <img
        src="/images/310595.svg"
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          color="primary" 
          variant="shadow"
          className="mt-10 mb-10"
          onClick={handleAction}
        >
          Revisar ahora
        </Button>
      </div>
    </div>
      <h1 className="text-lg text-azul" > ¡Tu gestión hace la diferencia!</h1>
      

      </div>
      
    </div>

    </>
    
      );
};
