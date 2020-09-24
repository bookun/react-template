import {
  AppBar,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { FunctionComponent } from "react";
import MyCalendar from "./components/calendar";
import Detail from "./components/detail";
import { RecoilRoot } from "recoil";

const useStyles = makeStyles({
  root: {
    margin: "10px",
  },
  logo: {
    color: "red",
  },
  card: {
    margin: "10px",
  },
});

const App: FunctionComponent = () => {
  const clasees = useStyles();

  return (
    <div className="App">
      <header className={clasees.logo}>
        <AppBar position="static" color="secondary">
          <Toolbar variant="dense">
            <IconButton color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">NamNam</Typography>
          </Toolbar>
        </AppBar>
      </header>
      <RecoilRoot>
        <div className={clasees.root}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <MyCalendar />
            </Grid>
            <Grid item xs={3}>
              <Detail />
            </Grid>
          </Grid>
        </div>
      </RecoilRoot>
    </div>
  );
};

export default App;
