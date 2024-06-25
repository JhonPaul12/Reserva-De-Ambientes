import { Button, DatePicker, DateValue, Input } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";
import { I18nProvider } from "@react-aria/i18n";

export const FormularioFeriado = ({
  actualizar,
}: {
  actualizar: () => void;
}) => {
  const [fecha, setFecha] = useState<DateValue | null>(null);
  const [motivo, setMotivo] = useState("");

  //Para la carga del boton
  const [loading, setLoading] = useState(false);

  const guardarfecha = (value: DateValue) => {
    setFecha(value);
  };
  const guardarmotivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotivo(e.target.value);
  };

  const guardar = async () => {
    if (fecha && motivo) {
      setLoading(true);
      const data = {
        // cambiamos la fecha a yyyy-mm-dd
        fecha_excepcion: new Date(fecha.toString()).toISOString().split("T")[0],
        motivo: motivo,
      };

      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/excepcion",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

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

    setLoading(false);
  };

  const limpiar = () => {
    setFecha(null);
    setMotivo("");
  };

  return (
    <div className="flex justify-center items-center  text-negro  mx-auto w-full max-w-screen-md sm:my-14 ">
      <div className="shadow-lg rounded-lg p-3 sm:p-6 w-full">
        <h1 className="text-2xl font-bold sm:my-5 text-center ">
          Registrar Feriado
        </h1>
        <form className="space-y-4">
          <I18nProvider locale="es-GB">
            <DatePicker
              labelPlacement="outside"
              size="lg"
              label="Fecha"
              fullWidth={true}
              value={fecha}
              onChange={guardarfecha}
            />
          </I18nProvider>

          <Input
            name="motivo feriado"
            type="text"
            fullWidth
            size="lg"
            label="Motivo"
            value={motivo}
            onChange={guardarmotivo}
          ></Input>
          <div className="flex justify-center">
            <Button
              className="bg-primary  text-white mx-5"
              onPress={guardar}
              isLoading={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </Button>
            <Button
              className="text-red-500"
              color="danger"
              variant="light"
              onPress={limpiar}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
