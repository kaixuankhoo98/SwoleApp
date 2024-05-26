import { FC, ReactNode, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../shared/theme/theme";
import { CssBaseline } from "@mui/material";

type AppWrapperProps = {
  children: ReactNode;
};

const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
    </Suspense>
  )
}

export default AppWrapper;