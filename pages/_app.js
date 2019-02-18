import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Head from "next/head";
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from 'react-jss/lib/JssProvider'
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { initStore } from '../redux/store';
import getPageContext from '../utils/getPageContext'

class DishinApp extends App {
  pageContext = getPageContext()
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      }
    };
  }
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Head>
          <title>Dishin App</title>
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
              <Component pageContext={this.pageContext}  {...pageProps} />
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container >
    );
  }
}

export default withRedux(initStore, { debug: true })(withReduxSaga(DishinApp)); // {async: true}
