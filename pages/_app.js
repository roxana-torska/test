import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import Head from "next/head";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import withRedux from "next-redux-wrapper";

import { initStore } from "../redux/store";
import getPageContext from "../utils/getPageContext";

class DishinApp extends App {
  pageContext = getPageContext();
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      },
    };
  }

  captureClientY = (event) => {
    // only respond to a single touch
    // const scrollingElem = document.getElementsByClassName(
    //   'autoCompleteScroll'
    // )[0];
    //scrollingElem &&scrollingElem.contains(event.target) &&
    // console.log('targetTouches', event.targetTouches);
    if (event.targetTouches.length === 1) {
      this._clientY = event.targetTouches[0].clientY;
      console.log("clientY", this._clientY);
    }
  };

  /*   handleBackgroundScroll = evt => {
    const scrollingElem = document.getElementsByClassName(
      'autoCompleteScroll'
    )[0];

    // only respond to a single touch
    if (evt.targetTouches.length !== 1) {
      return;
    }

    var clientY = evt.targetTouches[0].clientY - this._clientY;

    // console.log(
    //   'welcome to dishin page x',
    //   scrollingElem.scrollTop,
    //   clientY,
    //   scrollingElem.scrollHeight,
    //   scrollingElem.clientHeight
    // );
    // The element at the top of its scroll,
    // and the user scrolls down
    if (
      !scrollingElem ||
      (scrollingElem &&
        (!scrollingElem.contains(evt.target) ||
          (scrollingElem.scrollTop === 0 && clientY > 0)))
    ) {
      evt.preventDefault();
      console.log(
        'preventDefault here',
        !scrollingElem || (scrollingElem && !scrollingElem.contains(evt.target))
      );
      return false;
    }

    // The element at the bottom of its scroll,
    // and the user scrolls up
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
    if (
      !scrollingElem ||
      ((scrollingElem && !scrollingElem.contains(evt.target)) ||
        (scrollingElem.scrollHeight - scrollingElem.scrollTop <=
          scrollingElem.clientHeight &&
          clientY < 0))
    ) {
      evt.preventDefault();
      console.log(
        'preventDefault here',
        !scrollingElem || (scrollingElem && !scrollingElem.contains(evt.target))
      );
      return false;
    }

    return true;
  }; */

  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    this._clientY = 0;
    console.log("router pathname", this.props.router.asPath);
    if (
      [
        "/welcome-to-dishin",
        "/sign-in",
        "/new-sign-in",
        "/sign-up",
        "/new-sign-up",
        "/recover-password",
        "/reset-password",
        "/verify-email",
        "/dish",
        "/restaurant",
      ].includes(this.props.router.asPath)
    ) {
      document.body.style.overflow = "hidden"; //special page cases
      document.addEventListener("touchstart", this.captureClientY, {
        passive: false,
      });
      document.addEventListener("touchmove", this.handleBackgroundScroll, {
        passive: false,
      });
    }
    this.updateDishInHistory();
  }

  componentWillUnmount() {
    if (
      [
        "/welcome-to-dishin",
        "/sign-in",
        "/new-sign-in",
        "/sign-up",
        "/new-sign-up",
        "/recover-password",
        "/reset-password",
        "/verify-email",
        "/dish",
      ].includes(this.props.router.asPath)
    ) {
      document.removeEventListener("touchstart", this.captureClientY);
      document.removeEventListener("touchmove", this.handleBackgroundScroll);
    }
  }

  updateDishInHistory = () => {
    let dishInHistory = [];
    if (localStorage.getItem("dishInHistory")) {
      dishInHistory = JSON.parse(localStorage.getItem("dishInHistory"));
    }
    if (document.referrer) {
      let lastValue = null;
      let alreadyIn = null;
      if (dishInHistory.includes(document.referrer)) {
        dishInHistory.pop();
      } else {
        dishInHistory.push(document.referrer);
      }
      localStorage.setItem("dishInHistory", JSON.stringify(dishInHistory));
    } else {
      localStorage.removeItem("dishInHistory");
    }
  };

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Head>
          <title>Dyne</title>
        </Head>
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            <CssBaseline />
            <Provider store={store}>
              <Component pageContext={this.pageContext} {...pageProps} />
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default withRedux(initStore, { debug: true })(DishinApp);
