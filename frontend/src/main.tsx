import { RouterProvider, createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider, StyledEngineProvider, CssBaseline } from "@mui/material";
import { routeTree } from "./routeTree.gen";
import { themeOptions } from "./utils/MuiThemeOptions";

import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";

import "./index.scss";
import ReactQueryProvider from "./utils/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
  ...themeOptions,
});

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Toaster position="top-right" />
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </StyledEngineProvider>
    </ReactQueryProvider>
  </React.StrictMode>
);
