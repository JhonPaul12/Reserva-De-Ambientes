import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    console.log({ email, password });
    setIsLoading(true);

    if (!email && !password) {
      toast.error("Por favor, complete todos los campos");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log("Autenticado");
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
      <section className="container flex mt-[15%] text-blanco ">
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
