import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";

export const FormularioFeriado = ({
  actualizar,
}: {
  actualizar: () => void;
}) => {
  const [fecha, setFecha] = useState("");
  const [motivo, setMotivo] = useState("");

  const guardarfecha = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(e.target.value);
  };
  const guardarmotivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotivo(e.target.value);
  };

  const guardar = async () => {
    if (fecha && motivo) {
      const data = {
        fecha_excepcion: fecha,
        motivo: motivo,
      };

      try {
        const response = await fetch("http://127.0.0.1:8000/api/excepcion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const result = await response.json();
          toast.error(result.message);
        }
        if (response.ok) {
          toast.success("Feriado creado correctamente");
          actualizar();
          limpiar();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      toast.error("Por favor, rellene todos los campos");
    }
  };

  const limpiar = () => {
    setFecha("");
    setMotivo("");
  };

  return (
    <div className="flex justify-center items-center  text-negro w-full my-14 ">
      <div className="shadow-lg rounded-lg p-6 w-full">
        <h1 className="text-2xl font-bold my-5 text-center ">
          Registrar Feriado
        </h1>
        <form className="space-y-4">
          <Input
            name="fecha feriado"
            type="date"
            fullWidth
            size="lg"
            label="Fecha"
            value={fecha}
            onChange={guardarfecha}
          ></Input>

          <Input
            name="motivo feriado"
            type="text"
            fullWidth
            size="lg"
            label="Motivo"
            value={motivo}
            onChange={guardarmotivo}
          ></Input>
          <Button className="bg-primary  text-white mx-5" onPress={guardar}>
            Registrar
          </Button>
          <Button className="bg-danger  text-white " onPress={limpiar}>
            Cancelar
          </Button>
        </form>
      </div>
    </div>
  );
};
