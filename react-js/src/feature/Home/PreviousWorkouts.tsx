import { Box } from "@mui/material";
import { FC } from "react";

export const PreviousWorkouts: FC = () => {
  return <Box>Previous Workouts Here!</Box>;
};

// interface ServerDayProps extends PickersDayProps<Dayjs> {
//   highlightedDays?: number[];
// }

// function ServerDay(props: ServerDayProps) {
//   const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

//   const isSelected =
//     !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

//   return (
//     <Badge
//       key={day.toString()}
//       overlap="circular"
//       badgeContent={isSelected ? '🌚' : undefined}
//     >
//       <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
//     </Badge>
//   );
// }

// export const PreviousWorkouts: FC = () => {
//   // const [highlightedDays, setHighlightedDays] = useState([1, 5, 10, 15, 20]);
//   // const [isLoading, setIsLoading] = useState(false); // Simulates loading

//   const [ date, setDate ] = useState<Dayjs | undefined>(undefined);
//   const handleMonthChange = (newMonth: Dayjs) => {
//     setDate(newMonth.startOf('month'));
//   };

//   // const { data, isLoading } = useGetWorkouts(date);

//   // const highlightedDays = data ?? [];
//   const highlightedDays = [];

//   return (
//     <Box>
//       <Typography variant="body1" align="center">
//         Here's a summary of your previous workouts:
//       </Typography>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DateCalendar
//           loading={false}
//           onMonthChange={handleMonthChange}
//           renderLoading={() => <DayCalendarSkeleton />}
//           slots={{
//             day: ServerDay,
//           }}
//           slotProps={{
//             day: {
//               highlightedDays, // Use the placeholder highlighted days
//             } as ServerDayProps,
//           }}
//         />
//       </LocalizationProvider>
//     </Box>
//   );
// };
