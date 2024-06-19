// import { Dayjs } from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// interface CalendarioProps {
//   selectedDate: Dayjs | null;
//   onDateChange: (newValue: Dayjs | null) => void;
// }

// export function Calendario({ selectedDate, onDateChange }: CalendarioProps) {
//   const handleChange = (newValue: Dayjs | null) => {
//     onDateChange(newValue);
//     console.log("Selected date:", newValue?.format("YYYY-MM-DD"));
//   };

//   return (
//     <div className="">
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DemoContainer components={["DatePicker"]}>
//           <DatePicker value={selectedDate} onChange={handleChange} />
//         </DemoContainer>
//       </LocalizationProvider>
//     </div>
//   );
// }
