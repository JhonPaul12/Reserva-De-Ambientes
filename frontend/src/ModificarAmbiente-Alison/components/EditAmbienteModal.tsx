import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAmbienteStore } from "../../RegistrarAmbientes/store/ambientes.store";

export const EditAmbienteModal = ({ ambiente }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    "EDIFICIO ELEKTRO PLANTA BAJA"
  ];
  
  const [inputName, setInputName] = useState(`${ambiente.nombre}`);
  const [inputCap, setInputCap] = useState(`${ambiente.capacidad}`);
  const [inputUbi, setInputUbi] = useState(`${ambiente.ubicacion}`);
  const [inputType, setInputType] = useState(`${ambiente.tipo}`);
  const [buttonSave, setInputSave] = useState(false);
  const updateAmbiente = useAmbienteStore( state => state.updateAmbiente);

  const placeholderName =`${ambiente.nombre}`;
  const placeholderCap = `${ambiente.capacidad}`;
  const placeholderUbi = `${ambiente.ubicacion}`;
  const placeholderType= `${ambiente.tipo}`;

  const onInputChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;
    if (inputValue.value.length <30) {
      setInputName(inputValue.value);
    } else {
      toast.error('El nombre del ambiente debe tener como maximo 30 caracteres');
      console.log("El nombre del ambiente debe tener como maximo 30 caracteres");
    }
  }
  
  const onInputChangeCap = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;
    
      if (inputValue.value.length <= 5 || inputValue.value === '') {
        if (!isNaN(parseInt(inputValue.value))) {
            setInputCap(inputValue.value);
          } else {
            setInputCap('');
            toast.error('La capacidad debe expresarse numericamente');
            console.log("La capacidad debe expresarse numericamente");
          }
        } else {
          toast.error('La capacidad debe tener más de 5 caracteres numericos');
          console.log("La capacidad debe tener más de 5 caracteres numericos");
        }
      }
  const onInputChangeUbi = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inputValue = e.target as HTMLSelectElement;
  if (inputValue.value.length <= 150) {
    console.log(inputValue.value);
        setInputUbi(inputValue.value);

    } else {
      toast.error('La ubicacion del ambiente debe tener como maximo 150 caracteres');
      console.log("La ubicacion del ambiente debe tener como maximo 150 caracteres");
    }
  }

  const onInputChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inputValue = e.target as HTMLSelectElement;
        setInputType(inputValue.value);
  }

  const onInputChangeSave = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    
    if (placeholderName !== '' && placeholderUbi !== ''&& placeholderCap !== ''&& placeholderType !== '') {
      console.log(typeof inputName);
      console.log(inputName);
      console.log(typeof inputCap);
      console.log(inputCap);
      console.log(typeof inputUbi);
      console.log(inputUbi);
      console.log(typeof inputType);
      console.log(inputType);
      await updateAmbiente(ambiente.id, inputName,inputType, inputUbi,  parseInt(inputCap));
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      setInputSave(true);
      console.log(buttonSave);
    } else {

      toast.error('Todos los campos deben tener datos para registrar');
      console.log('Todos los campos deben tener datos para registrar');
    }
}


  return (
    <div>
      <div className="flex justify-center items-center">
        <Button className="bg-primary text-white my-2" onPress={onOpen}>
        Información básica
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar información básica
              </ModalHeader>
              <ModalBody>
              <form className='mt-5 space-y-6'>
        <div className="columnaR">
        <label className='text-ms text-gray-900'>Nombre*:</label>
        <br />
        <Input 
            type='text'
            name='nombre'
            className='w-full'
            placeholder={placeholderName}
            style={{
              textAlign: 'center', 
              fontSize: '16px', 
              padding: '10px'
            }}
            onChange={onInputChangeName}
          />
        <br />
        <label className='text-ms text-gray-900'>Capacidad*:</label>
        <br />
        <Input 
            type="number"
            name='capacidad'
            className='w-full'
            placeholder={placeholderCap}
            value={inputCap}
            style={{
              textAlign: 'center', 
              fontSize: '16px', 
              padding: '10px', 
            }}
            onChange={onInputChangeCap}
            min="0"
          />
        <br />
        
        <label className='text-ms text-gray-900'>Ubicación*:</label>
        <br />
        <Select
            value={inputUbi}
            className="w-full"
            aria-label="Selecciona una motivo"
            placeholder={placeholderUbi}
            onChange={onInputChangeUbi}
          >
              {ubicaciones.map((ubi) => (
                <SelectItem  key={ubi} value={ubi}>
                  {ubi}
                </SelectItem >
              ))}
            </Select>
        <br />
        <label className='text-ms text-gray-900'>Tipo*:</label>
        <br />
        <Select 
              value={inputType}
              className='w-full'
              name='tipoAmbiente'
              placeholder={placeholderType}
            onChange={onInputChangeType}
          >
          <SelectItem key={"Multifuncional"} value="Multifuncional">Multifuncional</SelectItem>
          <SelectItem key={"Aula"} value="Aula">Aula</SelectItem>
          <SelectItem key={"Laboratorio"} value="Laboratorio">Laboratorio</SelectItem>
        </Select>
        
        <br />
        </div>
      </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={onInputChangeSave} onPress={onOpen}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
