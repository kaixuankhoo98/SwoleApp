import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import { apiRequest } from "../../shared/hooks/api";
import { ApiEndpoints } from "../../shared/hooks/apiEndpoints";
import { dateOnly, dateToDateOnly } from "../../shared/dates";

const workoutsRequest = z.object({
  startDate: dateOnly,
  endDate: dateOnly.optional(),
});
type WorkoutsRequest = z.infer<typeof workoutsRequest>;

const workout = z.object({
  id: z.number(),
  startTime: z.date(),
  endTime: z.date(),
});
const workouts = z.array(workout);
type Workouts = z.infer<typeof workouts>;

export const usePreviousWorkouts = (request: WorkoutsRequest) => {
  return useSuspenseQuery({
    queryKey: [ApiEndpoints.Workouts, request],
    queryFn: async () => {
      const { startDate, endDate } = request;
      const response = await apiRequest<Workouts>(ApiEndpoints.Workouts, {
        method: "GET",
        queryParams: {
          startDate: dateToDateOnly(startDate),
          endDate: endDate ? dateToDateOnly(endDate) : undefined,
        },
      });
      return response;
    },
  });
};

export const useOpenWorkouts = () => {
  return useQuery({
    queryKey: [ApiEndpoints.OpenWorkouts],
    queryFn: async () => await apiRequest<Workouts>(ApiEndpoints.OpenWorkouts, {
      method: "GET",
    }),
  });
}
