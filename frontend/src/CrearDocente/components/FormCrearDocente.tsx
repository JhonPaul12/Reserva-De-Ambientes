import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { toast } from "sonner";
import axios, { isAxiosError } from "axios";
import { useDocenteStore } from "../store/docente.store";

export const FormCrearDocente = () => {
  const [inputName, setInputName] = useState("");
  const [inputApellidos, setInputApellidos] = useState("");
  const [inputTel, setInputTel] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputCod, setInputCod] = useState("");

  useEffect(() => {
    getMaterias();
  }, []);

  const onInputChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;
    if (inputValue.value.length < 30) {
      setInputName(inputValue.value);
    } else {
      toast.error("El nombre del docente debe tener como maximo 30 caracteres");
      console.log("El nombre del docente debe tener como maximo 30 caracteres");
    }
  };

  const onInputChangeApe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;
    if (inputValue.value.length < 30) {
      setInputApellidos(inputValue.value);
    } else {
      toast.error(
        "El apellido del docente debe tener como maximo 30 caracteres"
      );
      console.log(
        "El apellido del docente debe tener como maximo 30 caracteres"
      );
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = event.charCode;
    // Allow only numbers (charCode 48-57)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  const onInputChangeTele = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;

    if (inputValue.value.length <= 8) {
      if (inputValue.value === "0") {
        e.preventDefault();
        return;
      }
      setInputTel(inputValue.value);
    } else {
      toast.error("El telefono debe tener 8 dígitos");
      console.log("El telefono debe tener 8 dígitos");
    }
  };

  const onInputChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;
    if (inputValue.value.length <= 30) {
      console.log(inputValue.value);
      setInputEmail(inputValue.value);
    } else {
      toast.error("El email del docente debe tener como maximo 40 caracteres");
      console.log("El email del docente debe tener como maximo 40 caracteres");
    }
  };

  const onInputChangeCodigo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;

    if (inputValue.value.length <= 9) {
      if (inputValue.value === "0") {
        e.preventDefault();
        return;
      }
      setInputCod(inputValue.value);
    } else {
      toast.error("El CódigoSIS debe tener 9 dígitos");
      console.log("El CódigoSIS debe tener 9 dígitos");
    }
  };

  type Selection = Set<string>;
  const [inputMat, setMaterias] = useState<[]>([]);
  const [inputMaterias, setInputMaterias] = React.useState<number[][]>([]);
  const [values, setValues] = React.useState<Selection>(new Set<string>([]));

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const valores = e.target.value;
    const arrayNumeros = valores.split(",").map((numero) => numero.trim());
    console.log(arrayNumeros);
    const parsedArray = arrayNumeros.map((item) => {
      const [first, second] = item
        .slice(1, -1)
        .split("|")
        .map((num) => Number(num.trim()));
      return [first, second];
    });
    console.log(parsedArray);
    setInputMaterias(parsedArray);
    setValues(new Set(e.target.value.split(",")));
    console.log(values);
  };
  /*
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  
    // Obtener el valor del select
    const valores = e.target.value;
    
    // Remover los corchetes del principio y del final
    const valoresSinCorchetes = valores.slice(1, -1);
  
    // Separar por '],['
    const subCadenas = valoresSinCorchetes.split("],[");
  
    // Convertir cada sub-cadena en un array de números
    const arrayNumeros = subCadenas.map(subCadena => {
      return subCadena.split(",").map(numero => parseInt(numero.trim(), 10));
    });
  
    // Actualizar el estado
    setInputMaterias(arrayNumeros);
    setValues(new Set(e.target.value.split(",")));
    console.log(arrayNumeros);
    console.log(values);
  };*/

  interface InputMateria {
    materia: string;
    grupo: string;
    materia_id: number;
  }

  const getMaterias = async () => {
    try {
      const respuesta = await axios.get(
        `http://127.0.0.1:8000/api/MateriasLibres`
      );
      console.log(respuesta.data);
      setMaterias(respuesta.data);
    } catch (error) {
      toast.error("Error al rescatar las materias");
    }
  };
  const options = inputMat.map((inputHIn: InputMateria) => ({
    label: `${inputHIn.materia} - GRUPO: ${inputHIn.grupo}`,
    value: `[${inputHIn.materia_id} | ${inputHIn.grupo}]`,
  }));

  const createDocente = useDocenteStore((state) => state.createDocente);

  const onInputChangeSave = async (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      inputName !== "" &&
      inputApellidos !== "" &&
      inputTel !== "" &&
      inputEmail !== "" &&
      inputCod !== "" &&
      inputMaterias.length !== 0
    ) {
      console.log(typeof inputName);
      console.log(inputName);
      console.log(typeof inputApellidos);
      console.log(inputApellidos);
      console.log(typeof inputTel);
      console.log(inputTel);
      console.log(typeof inputEmail);
      console.log(inputEmail);

      console.log(typeof inputCod);
      console.log(inputCod);
      console.log(typeof inputMaterias);
      console.log(inputMaterias);
      if (!inputEmail.includes("@gmail.com"))
        toast.error("Ingrese un email válido");
      if (inputTel.length != 8)
        toast.error("Ingrese un telefono con 8 digitos");
      if (inputCod.length != 9) toast.error("Ingrese un CódigoSiS válido");

      try {
        await createDocente(
          inputName,
          inputApellidos,
          inputTel,
          inputCod,
          inputEmail,
          inputMaterias
        );
        /*const respuesta = await axios.post(
                `http://127.0.0.1:8000/api/docente`, {
                    inputName,
                    inputApellidos,
                    inputTel,
                    inputCod,
                    inputEmail,
                    inputMaterias
            });
            console.log(respuesta);
            toast.success("Guardado");*/
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error("Error al crear el docente");
        }
      }

      /*  setTimeout(() => {
        window.location.reload();
      }, 2000);*/
    } else {
      toast.error("Todos los campos son obligatorios");
      console.log("Todos los campos son obligatorios");
    }
  };

  const onInputChangeCancelar = async () => {
    window.location.reload();
  };

  return (
    <div>
      <label className="text-xl sm:text-3xl font-bold text-center text-gray-900 ml-5">
        CREAR DOCENTE
      </label>
      <form
        className="mt-5 space-y-6 md:space-y-0 md:space-x-6"
        onSubmit={onInputChangeSave}
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mb-6 md:mb-0 mr-5 ml-5">
            <label className="text-ms text-gray-900">Nombre*:</label>
            <br />
            <Input
              type="text"
              name="nombre"
              placeholder="Ingrese el nombre del docente..."
              className="w-full"
              value={inputName}
              onChange={onInputChangeName}
            />
            <br />
            <label className="text-ms text-gray-900">Apellidos*:</label>
            <br />
            <Input
              type="text"
              value={inputApellidos}
              placeholder="Ingrese los apellidos..."
              onChange={onInputChangeApe}
            />
            <br />

            <label className="text-ms text-gray-900">Teléfono*:</label>
            <br />
            <Input
              type="text"
              value={inputTel}
              placeholder="Ingrese un número..."
              onChange={onInputChangeTele}
              onKeyPress={handleKeyPress}
            />
            <br />
            <label className="text-ms text-gray-900">CódigoSIS*:</label>
            <br />
            <Input
              type="text"
              value={inputCod}
              placeholder="Ingrese un número..."
              onChange={onInputChangeCodigo}
              onKeyPress={handleKeyPress}
            />
            <br />
          </div>
          <div className="w-full md:w-1/2 ml-5">
            <label className="text-ms text-gray-900">Email*:</label>
            <br />
            <Input
              type="email"
              placeholder="tu@gmail.com"
              value={inputEmail}
              onChange={onInputChangeEmail}
              labelPlacement="outside"
              startContent={
                <MdEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
            <br />

            <label className="text-ms text-gray-900">
              Materias que dicta*:
            </label>
            <br />

            <Select
              label="Todas las materias"
              selectionMode="multiple"
              placeholder="Seleccione materia..."
              selectedKeys={values}
              className="mt-2 mb-5 w-full"
              onChange={handleSelectionChange}
            >
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  textValue={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            <br />

            <div className="flex gap-5 items-center">
              <Button
                onClick={onInputChangeCancelar}
                color="danger"
                variant="light"
                className="w-full mb-10"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                onClick={onInputChangeSave}
                color="primary"
                className="w-full mb-10"
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
