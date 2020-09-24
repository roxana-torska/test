import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import AppHeader from "../header/AppHeader";
import AppFooter from "../footer/AppFooter";
import { withStyles } from "@material-ui/core/styles";

import styles from "../../styles/common";
import SubHeader from "../SubHeader/SubHeader";
import DrawerMenu from "../DrawerMenu/DrawerMenu";

const splashScreen = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  fontSize: "0px",
  justifyContent: "center",
  alignItems: "center",
  margin: "0px",
  padding: "0px",
};
const splashLogo = {
  width: "100px",
  height: "100px",
  backgroundImage: "url(/static/imgs/logo.svg)",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

class AppLayout extends Component {
  state = {
    hideSplash: false,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ hideSplash: true });
    }, 500);
    console.log;
  }
  render() {
    const {
      children,
      classes,
      mode,
      DishesRef,
      ExploreRef,
      scrollFun,
      scrollContainer,
      tabsValue,
    } = this.props;
    const { hideSplash } = this.state;
    const { drawerOpen } = this.props;

    return hideSplash ? (
      drawerOpen ? (
        <Fragment>
          <AppHeader mode={"drawer"} />
          <DrawerMenu></DrawerMenu>
        </Fragment>
      ) : (
        <div>
          <AppHeader mode={mode} />
          <SubHeader
            DishesRef={DishesRef}
            ExploreRef={ExploreRef}
            scrollContainer={scrollContainer}
            scrollFun={scrollFun}
            tabsValue={tabsValue}
            mode={mode}
          />
          <div>{children}</div>

          {mode != "login" && <AppFooter />}
        </div>
      )
    ) : (
      <div style={splashScreen}>
        <div style={splashLogo} />
      </div>
    );
  }
}

export default connect((state) => ({
  drawerOpen: state.global.drawerOpen,
}))(withStyles(styles)(AppLayout));
