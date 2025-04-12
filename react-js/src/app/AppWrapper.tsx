import { FC, ReactNode, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../shared/theme/theme";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./AuthContext";
import { SnackbarProvider } from "notistack";

type AppWrapperProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  return (
    <AuthProvider>
      <SnackbarProvider maxSnack={3}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div>Loading...</div>}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </Suspense>
        </QueryClientProvider>
      </SnackbarProvider>
    </AuthProvider>
  );
};

export default AppWrapper;
