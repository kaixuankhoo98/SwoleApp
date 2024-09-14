import { Badge, Box, Typography } from "@mui/material";
import { FC, useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers/PickersDay/PickersDay";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import dayjs, { Dayjs } from "dayjs";
import { useGetWorkouts } from "../Workout/workoutHooks";

interface ServerDayProps extends PickersDayProps<Dayjs> {
  highlightedDays?: number[];
}

function ServerDay(props: ServerDayProps) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🌚' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export const PreviousWorkouts: FC = () => {
  // const [highlightedDays, setHighlightedDays] = useState([1, 5, 10, 15, 20]);
  // const [isLoading, setIsLoading] = useState(false); // Simulates loading

  const [ date, setDate ] = useState<Dayjs | undefined>(undefined);
  const handleMonthChange = (newMonth: Dayjs) => {
    setDate(newMonth.startOf('month'));
  };

  const { data, isLoading } = useGetWorkouts(date);

  const highlightedDays = data ?? [];

  return (
    <Box>
      <Typography variant="body1" align="center">
        Here's a summary of your previous workouts:
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          loading={isLoading}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays, // Use the placeholder highlighted days
            } as ServerDayProps,
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};
