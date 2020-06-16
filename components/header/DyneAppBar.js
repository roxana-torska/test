import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "../material/AppBar";
import Toolbar, { styles as toolbarStyles } from "../material/Toolbar";

//Assets
const logo = "../../static/imgs/Assets/SVG/logo.svg";
const iconSearch = "../../static/imgs/Assets/SVG/icons/search-icon.svg";
const iconHamburger = "../../static/imgs/Assets/SVG/icons/hamburger.svg";
console.log("iconSearch", iconSearch);

{
  /*lorem*/
}
const styles = (theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between",

    paddingTop: "6px",
    paddingBottom: "6px",
    height: "60px",
  },

  leftLinkActive: {
    color: "var(--dark--text)",
  },

  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  logo: {
    height: "40px",
    marginLeft: "16%",
  },
  icons: {
    marginTop: "3px",
    height: "17px",
  },

  menuIcon: {
    height: "17px",
    marginTop: "5px",
  },
});

function DyneAppBar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Link
            variant="h6"
            underline="none"
            className={clsx(classes.rightLink, classes.linkSecondary)}
            href="/premium-themes/onepirate/sign-up/"
          >
            <img className={classes.icons} alt="dyne" src={iconSearch}></img>
          </Link>

          <img className={classes.logo} alt="dyne" src={logo}></img>
          <Link
            color="inherit"
            variant="h6"
            underline="none"
            className={classes.rightLink}
            href="#"
          ></Link>
          <img
            className={classes.menuIcon}
            alt="dyne"
            src={iconHamburger}
          ></img>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

DyneAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DyneAppBar);
