import { Outlet } from "react-router-dom";
import "./App.css";
import { Router } from "./Router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavBar } from "./features/NavBar/NavBar";

// import { ParallaxProvider } from "react-scroll-parallax";

function App() {
  const theme = createTheme();
  return (
    <>
      {/* <ParallaxProvider> */}
      <ThemeProvider theme={theme}>
        <NavBar></NavBar>
        <Router></Router>
        <Outlet></Outlet>
      </ThemeProvider>
      {/* </ParallaxProvider> */}
    </>
  );
}

export default App;
