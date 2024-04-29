import { useEffect } from "react";
import { useAmbienteStore } from "./store/Ambientes.store";
import { TablaAmbientes } from "./components/TablaAmbientes";

export const VerAmbientes = () => {
  const ambientes = useAmbienteStore((state) => state.ambientes);
  const getAmbientes = useAmbienteStore((state) => state.getAmbientes);

  useEffect(() => {
    const fetchAmbientes = async () => {
      if (ambientes.length === 0) await getAmbientes();
    };

    fetchAmbientes();
    console.log(ambientes);
  }, [ambientes, getAmbientes]);

  return (
    <div className="text-negro w-full">
      <TablaAmbientes ambientes={ambientes} />
    </div>
  );
};
