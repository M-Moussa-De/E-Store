import { useState } from "react";
import Header from "./Header";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";


function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "dark" ? true : false
  );

  const paletteType = darkMode ? "dark" : "light";
  const handleThemeChange = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode ? "dark" : "light");
  };

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#f9f9f9" : "#121212",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />

      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
