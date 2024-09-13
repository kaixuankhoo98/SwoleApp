import { FC, ReactNode, Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary"

export const GenericErrorBoundary: FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <Suspense fallback={<div>LODADING!!!</div>}>
      {children}
    </Suspense>
  </ErrorBoundary>
)