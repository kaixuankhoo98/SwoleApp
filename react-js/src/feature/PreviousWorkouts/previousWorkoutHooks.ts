import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import { apiCall } from "../../shared/hooks/api";
import { ApiEndpoints } from "../../shared/hooks/apiEndpoints";
import { dateOnly, dateToDateOnly, dateTime, nullableDateTime } from "../../shared/dates";
import { HttpMethod } from "../../shared/hooks/http";

const workoutsRequest = z.object({
  startDate: dateOnly,
  endDate: dateOnly.optional(),
});
type WorkoutsRequest = z.infer<typeof workoutsRequest>;

const workout = z.object({
  id: z.number(),
  startTime: dateTime,
  endTime: nullableDateTime,
});
const workouts = z.array(workout);
export type Workouts = z.infer<typeof workouts>;

export const usePreviousWorkouts = (request: WorkoutsRequest) => {
  return useSuspenseQuery({
    queryKey: [ApiEndpoints.Workouts, request],
    queryFn: async () => {
      const { startDate, endDate } = request;
      return await apiCall({
        route: ApiEndpoints.Workouts, 
        method: HttpMethod.Get,
        queryParams: {
          startDate: dateToDateOnly(startDate),
          endDate: endDate ? dateToDateOnly(endDate) : undefined,
        },
      }, workouts);
    },
  });
};

export const useOpenWorkouts = () => {
  return useQuery({
    queryKey: [ApiEndpoints.OpenWorkouts],
    queryFn: async () => await apiCall({
      route: ApiEndpoints.OpenWorkouts,
      method: HttpMethod.Get,
    }, workouts),
  });
}
