import { useEffect } from "react";
import { useSolicitudesStore } from "./store/Solicitud.store";
import { TablaSolicitudes } from "./components/TablaSolicitudes";

export const VerSolicitudes = () => {
  const solicitudes = useSolicitudesStore((state) => state.solicitudes);
  const getSolicitudes = useSolicitudesStore((state) => state.getSolicitudes);

  useEffect(() => {
    const fetchAmbientes = async () => {
      if (solicitudes.length === 0) await getSolicitudes();
    };

    fetchAmbientes();
    console.log(solicitudes);
  }, [solicitudes, getSolicitudes]);

  return (
    <div className="text-negro w-full">
      <TablaSolicitudes solicitudes={solicitudes} />
    </div>
  );
};
