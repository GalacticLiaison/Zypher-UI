import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Router } from "./Router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ParallaxProvider } from "react-scroll-parallax";

function App() {
  const [count, setCount] = useState(0);
  const queryClient = new QueryClient();
  const theme = createTheme();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ParallaxProvider> */}
        <ThemeProvider theme={theme}>
          <Router></Router>
          <Outlet></Outlet>
        </ThemeProvider>
        {/* </ParallaxProvider> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
