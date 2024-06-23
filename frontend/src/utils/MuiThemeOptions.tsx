import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#2d55e2",
      light: "#7281ff",
      dark: "#002daf",
    },
    secondary: {
      main: "#ff0000",
      light: "#ff5a36",
      dark: "#c20000",
    },
    background: {
      default: "#0c1430",
      paper: "#020218",
    },
    text: {
      primary: "rgba(255,255,255,0.87)",
      secondary: "rgba(255,255,255,0.6)",
      disabled: "rgba(255,255,255,0.38)",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        sx: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
          borderRadius: 6,
          ":disabled": {
            backgroundColor: "#7281ff",
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#7D94E4",
          borderRadius: 6,
        },
        root: {
          fontWeight: 300,
          fontSize: "0.9rem",
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          ":hover": {
            backgroundColor: "#181845",
          },
        },
      },
    },
  },
};
