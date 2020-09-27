import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { searchDishes } from "../../redux/dishes/actions";
import { clearSearch } from "../../redux/dishes/actions";
import Typography from "@material-ui/core/Typography";
import styles from "../../styles/common";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SearchBox from "../search/SearchBox";

const SubHeader = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    classes,
    mode,
    ExploreRef,
    DishesRef,
    scrollFun,
    global: { location },
    tabsValue,
    scrollContainer,
    title,
  } = props;
  console.log("props in subheader", location);
  useEffect(() => {
    console.log(tabsValue);
    if (tabsValue != null) {
      setValue(tabsValue);
    }
  }, [tabsValue]);
  if (mode == "back" || mode == "login") {
    return <div></div>;
  } else if (mode == "home") {
    return (
      <div
        style={{
          position: "sticky",
          top: "0px",
          zIndex: "1",
          height: "37px",
          backgroundColor: "#e1e1e1",
        }}
      >
        {!title ? (
          <Typography className={classes.sectionDevider}>
            <span style={{ fontFamily: "Poppins-Bold" }}>Tel-Aviv's</span> Top 5
            {/*    <span className={classes.location}>
              {" "}
              {location.address || "Tel-Aviv"}{" "}
            </span> */}
          </Typography>
        ) : (
          <Typography className={classes.leagueTitle}>{title}</Typography>
        )}
      </div>
    );
  } else if (mode === "restaurant") {
    return (
      <div
        style={{
          position: "sticky",
          top: "0px",
          zIndex: "99",
          height: "37px",
        }}
      >
        {!title ? (
          <Typography className={classes.leagueTitle}>
            <span className={classes.location}>Open</span>
            <span>&nbsp;closes at 00:00</span>
          </Typography>
        ) : (
          <Typography className={classes.leagueTitle}>{title}</Typography>
        )}
      </div>
    );
  } else {
    return (
      <div ref={scrollContainer} className={classes.tabsContainer}>
        {!title ? (
          <Tabs
            classes={{ root: classes.tabs, indicator: classes.indicator }}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="#6B6F83"
            variant="scrollable"
            scrollButtons="desktop"
            aria-label="scrollable auto tabs example"
          >
            <Tab
              classes={{
                root: classes.tab,
                label: classes.tabLabel,
                selected: "selected",
              }}
              onClick={() => {
                scrollFun({
                  y: DishesRef.current.offsetTop - 100,
                  smooth: true,
                });
              }}
              style={{ textTransform: "none" }}
              label="Dishes"
            />
            <Tab
              classes={{
                root: classes.tab,
                label: classes.tabLabel,
                selected: "selected",
              }}
              className={classes.tab}
              onClick={() => {
                scrollFun({
                  y: ExploreRef.current.offsetTop + 90,
                  smooth: true,
                });
              }}
              style={{ textTransform: "none" }}
              label="Restaurants"
            />
            <Tab
              classes={{
                root: classes.tab,
                label: classes.tabLabel,
                selected: "selected",
              }}
              style={{ textTransform: "none" }}
              label="Reviews"
            />
            <Tab
              classes={{
                root: classes.tab,
                label: classes.tabLabel,
                selected: "selected",
              }}
              style={{ textTransform: "none" }}
              label="Followed"
            />{" "}
          </Tabs>
        ) : (
          <div ref={ExploreRef}>
            <Typography className={classes.leagueTitle}>{title}</Typography>
          </div>
        )}
      </div>
    );
  }
};

export default connect(
  (state) => ({
    global: state.global,
    searchTerm: state.DishesReducer.searchTerm,
    force: state.DishesReducer.force,
  }),
  null
)(withStyles(styles)(SubHeader));
