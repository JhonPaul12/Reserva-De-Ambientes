import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useEffect, useState } from "react";
import axios from "axios";
import { Reserva } from "../interfaces/Reserva";
import "./estilos.css";

dayjs.locale("es");

const messages = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "No hay eventos en este rango.",
  showMore: (total: number) => `+ Ver más (${total})`,
};

interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
}

export const Calendario = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    getSolicitudes();
  }, []);

  const getSolicitudes = async () => {
    try {
      const respuesta = await axios.get(
        import.meta.env.VITE_API_URL + "/api/allPeriodosLibres"
      );
      const transformedEvents = transformEvents(respuesta.data);
      setEvents(transformedEvents);
    } catch (error) {
      console.error("Error fetching solicitudes", error);
    }
  };

  const transformEvents = (solicitudes: Reserva[]): CalendarEvent[] => {
    return solicitudes.flatMap((solicitud) => ({
      start: dayjs(
        solicitud.fecha + "T" + solicitud.horario.hora_inicio
      ).toDate(),
      end: dayjs(solicitud.fecha + "T" + solicitud.horario.hora_fin).toDate(),
      title: solicitud.ambiente.nombre,
    }));
  };

  const localizer = dayjsLocalizer(dayjs);

  const minTime = new Date();
  minTime.setHours(6, 45, 0);
  const maxTime = new Date();
  maxTime.setHours(21, 45, 0);

  return (
    <div className="calendario-container text-black">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        min={minTime}
        max={maxTime}
        step={45}
        timeslots={2}
        messages={messages}
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        className="striped hoverable"
      />
    </div>
  );
};
