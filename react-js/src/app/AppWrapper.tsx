import { FC, ReactNode, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../shared/theme/theme";
import { CssBaseline } from "@mui/material";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./AuthContext";
import { SnackbarProvider } from "notistack";
import { ZodError } from "zod";
import { useSnackbar } from "../shared/hooks/snackbar";

type AppWrapperProps = {
  children: ReactNode;
};

const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (error instanceof ZodError) {
          console.error(error.message);
        } else {
          console.error(error, query.queryKey);
        }
        enqueueSnackbar({message: error.message, variant: "error"});
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60, // Data is considered fresh for 1 minute
        gcTime: 1000 * 60 * 5, // Cache is kept for 5 minutes
      },
    },
  });

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
