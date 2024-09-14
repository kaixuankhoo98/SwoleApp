import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../../shared/hooks/api"
import dayjs, { Dayjs } from "dayjs"
import { z } from "zod"

enum WorkoutEndpoint {
  Workouts = '/api/workouts/'
}

const dateSchema = z.array(z.number());

type DateSchemma = z.infer<typeof dateSchema>;

export const useGetWorkouts = (date?: Dayjs) => {
  const currentDate = dayjs();
  return useQuery({
    queryKey: [WorkoutEndpoint.Workouts, date],
    queryFn: async () => {
      const result = await apiRequest<DateSchemma>(WorkoutEndpoint.Workouts, {
        method: 'GET',
        queryParams: { date: date?.format() ?? currentDate.format() }
      });
      const workouts = dateSchema.parse(result);
      return workouts;
    }
  })
}