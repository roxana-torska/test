import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import MenuHeader from '../header/MenuHeader';
import AppFooter from '../footer/AppFooter';
import { withStyles } from '@material-ui/core/styles';
import Notifier from '../common/Notifier';
import styles from '../../styles/common';

const splashScreen = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  fontSize: '0px',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0px',
  padding: '0px'
};
const splashLogo = {
  width: '100px',
  height: '100px',
  backgroundImage: 'url(/static/imgs/logo.png)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#f44336'
};

class MenuLayout extends Component {
  state = {
    hideSplash: false
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ hideSplash: true });
    }, 500);
  }
  render() {
    const {
      children,
      classes,
      selectedPageTab,
      toggleMenu,
      changeOverlay,
      menuData,
      onMenuChange,
      menuName,
      isDishDetails,
      isHomePage,
    } = this.props;
    const { hideSplash } = this.state;
    return hideSplash ? (
      <React.Fragment>
        <MenuHeader
          selectedPageTab={selectedPageTab}
          toggleMenu={toggleMenu}
          changeOverlay={changeOverlay}
          menuData={menuData}
          isDishDetails={isDishDetails}
          isHomePage={isHomePage}
          // onMenuChange={onMenuChange}
          menuName={menuName}
        />
        <div className={classes.headerMarginSuppress}>{children}</div>
        <Notifier />
        {/* <RestaurantFooter /> */}
      </React.Fragment>
    ) : (
        <div style={splashScreen}>
          <div style={splashLogo} />
        </div>
      );
  }
}

export default observer(withStyles(styles)(MenuLayout));
