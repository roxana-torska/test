import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import SocialLinks from './SocialLinks';
import classnames from 'classnames';
import styles from '../../styles/common';
import { APP_URL } from '../../utils/config';

class FooterActions extends React.Component {
  render() {
    const { linkAction, classes } = this.props;
    return (
      <div className={classes.footerActionsCT}>
        <div className={classes.footerBgIconLeft} />
        <div className={classes.footerBgIconRight} />
        {linkAction}
        <Typography>&#160;</Typography>
        <div className={classes.footerLatoTextNormal}>Or Connect with</div>
        <Typography style={{ marginBottom: '2px' }}>&#160;</Typography>
        <SocialLinks />
        <Typography>&#160;</Typography>
        <div className={classes.footerLatoTextNormal}>
          Forgot Password?{' '}
          <a
            href={`/recover-password`}
            className={classnames(
              classes.footerLatoTextBold,
              classes.footerLink1
            )}
          >
            Recover Password
          </a>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FooterActions);
