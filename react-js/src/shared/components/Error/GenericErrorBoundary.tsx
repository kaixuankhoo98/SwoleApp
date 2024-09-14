import { FC, ReactNode, Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary"
import { Loading } from "../Loading";

export const GenericErrorBoundary: FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <Suspense fallback={<Loading/>}>
      {children}
    </Suspense>
  </ErrorBoundary>
)