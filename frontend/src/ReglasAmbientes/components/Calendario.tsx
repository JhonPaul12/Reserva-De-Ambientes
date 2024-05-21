// import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";

dayjs.locale("es");
interface CalendarioProps {
  initialDate: Dayjs | null;
  onDateChange: (newValue: Dayjs | null) => void;
}

export function Calendario({ initialDate, onDateChange }: CalendarioProps) {
  const [selectDate, setSelectDate] = useState<Dayjs | null>(initialDate);

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectDate(newValue);
    onDateChange(newValue);
  };
  useEffect(() => {
    setSelectDate(initialDate);
  }, [initialDate]);

  return (
    <div className="mt-5">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            value={selectDate}
            onChange={handleDateChange}
            format="DD/MM/YYYY"
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
