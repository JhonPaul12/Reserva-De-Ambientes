import { useState } from "react";
import { toast } from "sonner";
import { useAmbienteStore } from "../store/ambientes.store";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

export const FormRA = () => {
  const ubicaciones = [
    "DEPARTAMENTO DE BIOLOGIA",
    "DEPARTAMENTO DE QUÍMICA",
    "DEPARTAMENTO DE FÍSICA",
    "BIBLIOTECA FCYT",
    "DEPARTAMENTO INDUSTRIAL",
    "EDIFICIO CAD-CAM",
    "BLOQUE CENTRAL EDIFICIO DECANATURA",
    "EDIFICIO ACADÉMICO 2 PLANTA BAJA",
    "EDIFICIO ACADÉMICO 2 PRIMER PISO",
    "EDIFICIO ACADÉMICO 2 SEGUNDO PISO",
    "EDIFICIO ACADÉMICO 2 TERCER PISO",
    "EDIFICIO DE LABORATORIOS BÁSICOS-PLANTA BAJA",
    "EDIFICIO DE LABORATORIOS BÁSICOS-PRIMER PISO",
    "EDIFICIO DE LABORATORIOS BÁSICOS-SEGUNDO PISO",
    "EDIFICIO DE LABORATORIOS BÁSICOS-TERCER PISO",
    "EDIFICIO DE LABORATORIOS BÁSICOS-CUARTO PISO",
    "BLOQUE TRENCITO",
    "AULAS INFLAB",
    "EDIFICIO MEMI",
    "EDIFICIO ELEKTRO PRIMER PISO",
    "EDIFICIO ELEKTRO SEGUNDO PISO",
    "EDIFICIO ELEKTRO TERCER PISO",
    "EDIFICIO ELEKTRO PLANTA BAJA",
  ];

  const [inputName, setInputName] = useState("");
  const [inputCap, setInputCap] = useState("");
  const [inputUbi, setInputUbi] = useState("");
  const [inputType, setInputType] = useState("");
  const [buttonSave, setInputSave] = useState(false);
  const createAmbiente = useAmbienteStore((state) => state.createAmbiente);

  const onInputChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;
    if (inputValue.value.length < 30) {
      setInputName(inputValue.value);
    } else {
      toast.error(
        "El nombre del ambiente debe tener como maximo 30 caracteres"
      );
      console.log(
        "El nombre del ambiente debe tener como maximo 30 caracteres"
      );
    }
  };

  const onInputChangeCap = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;

    if (inputValue.value.length <= 5 || inputValue.value === "") {
      if (!isNaN(parseInt(inputValue.value))) {
        setInputCap(inputValue.value);
      } else {
        setInputCap("");
        toast.error("La capacidad debe expresarse numericamente");
        console.log("La capacidad debe expresarse numericamente");
      }
    } else {
      toast.error("La capacidad debe tener más de 5 caracteres numericos");
      console.log("La capacidad debe tener más de 5 caracteres numericos");
    }
  };
  const onInputChangeUbi = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inputValue = e.target as HTMLSelectElement;
    if (inputValue.value.length <= 150) {
      console.log(inputValue.value);
      setInputUbi(inputValue.value);
    } else {
      toast.error(
        "La ubicacion del ambiente debe tener como maximo 150 caracteres"
      );
      console.log(
        "La ubicacion del ambiente debe tener como maximo 150 caracteres"
      );
    }
  };

  const onInputChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inputValue = e.target as HTMLSelectElement;
    setInputType(inputValue.value);
  };

  const onInputChangeSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (
      inputName !== "" &&
      inputCap !== "" &&
      inputType !== "" &&
      inputUbi !== ""
    ) {
      console.log(typeof inputName);
      console.log(inputName);
      console.log(typeof inputCap);
      console.log(inputCap);
      await createAmbiente(inputName, inputType, inputUbi, parseInt(inputCap));
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      setInputSave(true);
      setInputCap("");
      setInputName("");
      setInputUbi("");
      setInputType("");
      console.log(buttonSave);
    } else {
      toast.error("Todos los campos son obligatorios");
      console.log("Todos los campos son obligatorios");
    }
  };

  const onInputChangeCancel = () => {
    window.location.reload();};
  return (
    <div>
      <label className="text-3xl font-bold text-center text-gray-900">
        REGISTRO DE AMBIENTE
      </label>
      <form className="mt-5 space-y-6">
        <div className="columnaR">
          <label className="text-ms text-gray-900">Nombre*:</label>
          <br />
          <Input
            type="text"
            name="nombre"
            className="w-full"
            value={inputName}
            style={{
              textAlign: "center",
              fontSize: "16px",
              padding: "10px",
            }}
            onChange={onInputChangeName}
          />
          <br />
          <label className="text-ms text-gray-900">Capacidad*:</label>
          <br />
          <Input
            type="number"
            name="capacidad"
            className="w-full"
            value={inputCap}
            style={{
              textAlign: "center",
              fontSize: "16px",
              padding: "10px",
            }}
            onChange={onInputChangeCap}
            min="1"
          />
          <br />

          <label className="text-ms text-gray-900">Ubicación*:</label>
          <br />
          <Select
            value={inputUbi}
            className="w-full"
            aria-label="Selecciona una motivo"
            onChange={onInputChangeUbi}
          >
            {ubicaciones.map((ubi) => (
              <SelectItem key={ubi} value={ubi}>
                {ubi}
              </SelectItem>
            ))}
          </Select>
          <br />
          <label className="text-ms text-gray-900">Tipo*:</label>
          <br />
          <Select
            value={inputType}
            className="w-full"
            name="tipoAmbiente"
            onChange={onInputChangeType}
          >
            <SelectItem key={"Multifuncional"} value="Multifuncional">
              Multifuncional
            </SelectItem>
            <SelectItem key={"Aula"} value="Aula">
              Aula
            </SelectItem>
            <SelectItem key={"Laboratorio"} value="Laboratorio">
              Laboratorio
            </SelectItem>
          </Select>

          <br />
          <div className="flex gap-5 items-center">
            <Button
              onClick={onInputChangeCancel}
              color="primary"
              className="w-full mb-10"
            >
              Cancelar
            </Button>
            <Button
              onClick={onInputChangeSave}
              color="primary"
              className="w-full mb-10"
            >
              Guardar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
