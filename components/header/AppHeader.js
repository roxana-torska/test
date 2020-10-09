import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { searchDishes, clearSearch } from "../../redux/dishes/actions";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import Router from "next/router";
import styles from "../../styles/common";
import Avatar from "@material-ui/core/Avatar";
import SearchBox from "../search/SearchBox";
import next from "next";
import globalActions from "../../redux/global/actions";

const { toggleFilterMenu } = globalActions;

const handleBack = () => {
  Router.back();
};

const AppHeader = (props) => {
  const { drawerOpen, toggleFilterMenu } = props;
  const toggleDrawer = () => {
    console.log(drawerOpen);
    toggleFilterMenu({ drawerOpen: !drawerOpen });
  };

  const { classes, searchDishes, searchTerm, force, clearSearch, mode } = props;
  const [searchMode, setSearchMode] = useState(false);
  function toggleSearchMode() {
    if (searchMode) {
      setSearchMode(false);
      clearSearch();
    } else {
      setSearchMode(true);
    }
  }
  function handleSearchTerm(searchTerm) {
    searchDishes(searchTerm);
  }
  useEffect(() => {
    if (searchTerm && searchTerm.length > 1) {
      setSearchMode(true);
    }
  }, [searchTerm]);

  if (mode === "back" || mode === "restaurant") {
    return (
      <div className={classes.topbar} elevation={0} color="inherit">
        <Toolbar>
          <IconButton className={classes.topBarIconSearch} onClick={handleBack}>
            <img
              className={classes.topBarIconBack}
              src="../../static/imgs/Assets/SVG/icons/topBar-icon-back.svg"
            />
          </IconButton>
          <div className={classes.topBarLogoContainer}>
            <img className={classes.topBarLogo} src="/static/imgs/logo.svg" />
          </div>

          <IconButton
            className={classes.topBarIconMenu}
            onClick={(e) => {
              toggleDrawer(e);
            }}
          >
            <img
              className={classes.topBarIcon}
              src="/static/icons/topBar-icon-hamburger.svg"
            />
          </IconButton>
        </Toolbar>
      </div>
    );
  } else if (searchMode) {
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static" elevation={0}>
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
            <div className={classes.topBarSearch}>
              {force == "force" ? (
                <SearchBox
                  inputValue={searchTerm}
                  OnChange={(e) => {
                    handleSearchTerm(e);
                  }}
                />
              ) : (
                <SearchBox
                  OnChange={(e) => {
                    handleSearchTerm(e);
                  }}
                />
              )}
            </div>
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
      </div>
    );
  } else if (mode === "drawer") {
    return (
      <div className={classes.root}>
        <AppBar
          className={classes.AppBarBlack}
          position="static"
          elevation={0}
          color="inherit"
        >
          <Toolbar style={{ filter: "brightness(2000) saturate(0)" }}>
            <Avatar
              style={{
                width: "28px",
                height: "28px",
                transform: "translate(0px,-4px)",
              }}
              alt="Remy Sharp"
              src="/static/imgs/profile-girl-round.png"
            />
            <div className={classes.topBarBlackLogoContainer}>
              <img
                className={classes.topBarBlackLogo}
                src="/static/imgs/logo.svg"
              />
            </div>

            <IconButton
              className={classes.topBarIconMenu}
              onClick={(e) => {
                toggleDrawer(e);
              }}
            >
              <img
                className={classes.topBarIcon}
                src="/static/icons/x-icon.svg"
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          elevation={0}
          color="inherit"
          stlye={{ background: "white" }}
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
              onClick={(e) => {
                toggleDrawer(e);
              }}
            >
              <img
                className={classes.topBarIcon}
                src="/static/icons/topBar-icon-hamburger.svg"
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};
AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    drawerOpen: state.global.drawerOpen,
    global: state.global,
    searchTerm: state.DishesReducer.searchTerm,
    force: state.DishesReducer.force,
  }),
  { searchDishes, clearSearch, toggleFilterMenu }
)(withStyles(styles)(AppHeader));
