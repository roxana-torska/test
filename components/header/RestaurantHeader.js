import React, { useState } from "react";
import CustomInput from "../customInput/CustomInput";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  MenuIcon,
  Typography,
  EditIcon,
  SaveIcon,
  MoreVertIcon,
} from "@material-ui/core";

import SvgIcon from "@material-ui/core/SvgIcon";
import styles from "../../styles/common";

function RestaurantHeader(props) {
  const { classes } = props;
  const [searchMode, setSearchMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSearchMode = () => {
    searchMode ? setSearchMode(false) : setSearchMode(true);
  };
  if (searchMode) {
    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          elevation={0}
          color="#ffffff"
          disableGutters={true}
        >
          <Toolbar>
            <IconButton
              className={classes.topBarIconSearch}
              onClick={toggleSearchMode}
            >
              <img
                className={classes.topBarIcon}
                src="/static/icons/topBar-icon-search.svg"
              />
            </IconButton>
            <AutoComplete
              className={classes.topBarSearch}
              /*    innerRef={this.autoCompleteRef} */
              id="restaurantName"
              name="restaurantName"
              placeholder="Search dishes, places, people"
            />
            <IconButton
              className={classes.topBarIconMenu}
              onClick={toggleSearchMode}
            >
              <img
                className={classes.topBarIcon}
                src="/static/icons/x-icon.svg"
              />
            </IconButton>{" "}
          </Toolbar>
        </AppBar>

        <hr className={classes.headerHr} />
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <AppBar
          disableGutters={true}
          position="static"
          elevation={0}
          color="#ffffff"
        >
          <Toolbar className={classes.topbar}>
            <IconButton
              className={classes.topBarIconSearch}
              onClick={toggleSearchMode}
            >
              <img
                className={classes.topBarIcon}
                src="/static/icons/topBar-icon-search.svg"
              />
            </IconButton>
            <div className={classes.topBarLogoContainer}>
              <img className={classes.topBarLogo} src="/static/imgs/logo.svg" />
            </div>

            <IconButton
              className={classes.topBarIconMenu}
              onClick={toggleSearchMode}
            >
              <img
                className={classes.topBarIcon}
                src="/static/icons/topBar-icon-hamburger.svg"
              />
            </IconButton>
          </Toolbar>
        </AppBar>

        <hr className={classes.headerHr} />
      </div>
    );
  }
}
RestaurantHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestaurantHeader);
