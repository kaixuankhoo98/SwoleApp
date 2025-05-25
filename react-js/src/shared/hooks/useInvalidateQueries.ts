import { useQueryClient } from "@tanstack/react-query";

export function useInvalidateQueries<TData, TVariables, TContext>(
  keys: 
    | string[][]
    | ((data: TData, variables: TVariables, context: TContext | undefined) => string[][]),
  options?: {
    onSuccess?: (data: TData, variables: TVariables, context: TContext | undefined) => void;
  }
): { onSuccess: (data: TData, variables: TVariables, context: TContext | undefined) => void } {
  const queryClient = useQueryClient();
  return {
    ...options,
    onSuccess: (data, variables, context): void => {
      const keysResult = typeof keys === "function" ? keys(data, variables, context) : keys;
      keysResult.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
      options?.onSuccess?.(data, variables, context);
    }
  }
}
