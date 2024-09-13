import { FC, ReactNode, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../shared/theme/theme";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type AppWrapperProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </Suspense>
    </QueryClientProvider>
  );
};

export default AppWrapper;
