// import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { Dayjs } from "dayjs";

dayjs.locale("es");
interface CalendarioProps {
  onDateChange: (newValue: Dayjs | null) => void;
}

export function Calendario({ onDateChange }: CalendarioProps) {
  const [selectDate, setSelectDate] = useState<Dayjs | null>(null);

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectDate(newValue);
    onDateChange(newValue);
  };

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
