import { FC, ReactNode, Suspense } from "react";

import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { Loading } from "../Loading";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Stack, Typography, Alert } from "@mui/material";
import Button from "../Button";
import { isHttpError, isZodError } from "../../hooks/api";

const FallbackComponent: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const devEnv = import.meta.env.MODE === "development";

  return (
    <Stack>
      <Alert severity="error">
        Error
      </Alert>
      {isHttpError(error) &&
        <Button onClick={resetErrorBoundary}>Reset</Button>
      }
      {devEnv && isZodError(error) && <Typography>{error.message}</Typography>}
    </Stack>
  )
}

export const GenericErrorBoundary: FC<{ children: ReactNode }> = ({ children }) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary onReset={reset} FallbackComponent={FallbackComponent}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
)