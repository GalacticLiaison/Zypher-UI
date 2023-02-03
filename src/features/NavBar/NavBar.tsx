import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";

interface INavBarProps {}

export const NavBar = (props: INavBarProps) => {
  const rootStyle = {
    background: "linear-gradient(45deg, #343d46 30%, #FF8E53 90%)",
    color: "white",
    // height: 100,
  };

  const titleStyle = {
    flexGrow: 1,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
  };

  return (
    <AppBar position="fixed" sx={rootStyle}>
      <Toolbar>
        <Link to="/gamemaster">
          <Button variant="outlined" size="large" color="warning">
            Game Master
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outlined" size="large" color="warning">
            Story
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
