import { useEffect } from "react";

import "./App.css";
import { CanvasProvider } from "./contexts/CanvasContext";
import DrawingScreenContainer from "./components/DrawingScreenContainer";
import SettingsForm from "./components/SettingsForm";
import Header from "./components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#264653",
    },
    secondary: {
      main: "#2a9d8f",
    },
    third: {
      main: "#e9c46a",
      second: "#f4a261",
      third: "#e76f51",
    },
    white: { main: "#fff" },
  },
});

function App() {
  useEffect(() => {
    document.title = "Pixel Art";
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CanvasProvider>
        <Header />
        <Router>
          <Routes>
            <Route exact path="/" element={<SettingsForm />}></Route>
            <Route
              path="/draw/:canvasId"
              element={<DrawingScreenContainer />}
            ></Route>
          </Routes>
        </Router>
      </CanvasProvider>
    </ThemeProvider>
  );
}

export default App;