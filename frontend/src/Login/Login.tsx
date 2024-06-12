import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { useAuthStore } from "./stores/auth.store";
import { Navigate } from "react-router-dom";
import { HeaderIni } from "../layouts/ini/components/HeaderIni";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const authStatus = useAuthStore((state) => state.authStatus);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);
  const user = useAuthStore((state) => state.user);

  const login = useAuthStore((state) => state.login);
  if (authStatus === "pending") {
    checkAuthStatus();
  }

  //Valido si el usuario ya es este autenticado lleva a admin por defecto
  if (authStatus === "auth") {
    toast.success("Bienvenido");
    console.log(user?.roles);
    if (user?.roles.includes("Admin")) {
      return <Navigate to="/admin/inicio" />;
    }
    return <Navigate to="/user/inicio" />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    console.log({ email, password });
    setIsLoading(true);

    if (!email && !password) {
      toast.error("Por favor, complete todos los campos");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log("Autenticado");
      await login(email, password);
    }
  };
  return (
    <div>
      <Toaster
        position="top-right"
        richColors
        closeButton
        style={{ position: "absolute" }}
      />
      <HeaderIni />
      <section className="container flex mt-[10%] text-blanco ">
        {/* Formulario */}
        <div className="login__form">
          <h3 className="font-bold text-2xl mb-4"> Inicio Sesion</h3>
          <form noValidate onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="email"
              isRequired
              type="email"
              size="sm"
              label="Correo Eelectronico"
            />
            <Input
              name="password"
              isRequired
              type="password"
              size="sm"
              label="Contraseña"
            />
            <Button
              isLoading={isLoading}
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded"
            >
              Iniciar Sesion
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};
