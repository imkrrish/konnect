import { RouterProvider, createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider, StyledEngineProvider, CssBaseline } from "@mui/material";
import { routeTree } from "./routeTree.gen";

import "@fontsource/poppins";
import "./index.scss";
import ReactQueryProvider from "./utils/ReactQueryProvider";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
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
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </StyledEngineProvider>
    </ReactQueryProvider>
  </React.StrictMode>
);
