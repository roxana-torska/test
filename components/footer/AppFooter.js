import React, { PureComponent, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import styles from "../../styles/common";

class AppFooter extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.footer}>
          <div className={classes.footerCol}>
            <h1 className={classes.footerColH1}>Company</h1>
            <ul className={classes.footerColUl}>
              <li className={classes.footerColUlLi}>About</li>
              <li className={classes.footerColUlLi}>Mission</li>
              <li className={classes.footerColUlLi}>Services</li>
              <li className={classes.footerColUlLi}>Social</li>
              <li className={classes.footerColUlLi}>Get in touch</li>
            </ul>
          </div>
          <div className={classes.footerCol}>
            <h1 className={classes.footerColH1}>Products</h1>
            <ul className={classes.footerColUl}>
              <li className={classes.footerColUlLi}>About</li>
              <li className={classes.footerColUlLi}>Mission</li>
              <li className={classes.footerColUlLi}>Services</li>
              <li className={classes.footerColUlLi}>Social</li>
              <li className={classes.footerColUlLi}>Get in touch</li>
            </ul>
          </div>
          <div className={classes.footerCol}>
            <h1 className={classes.footerColH1}>Products</h1>
            <ul className={classes.footerColUl}>
              <li className={classes.footerColUlLi}>About</li>
              <li className={classes.footerColUlLi}>Mission</li>
              <li className={classes.footerColUlLi}>Services</li>
              <li className={classes.footerColUlLi}>Social</li>
              <li className={classes.footerColUlLi}>Get in touch</li>
            </ul>
          </div>

          <div className={classes.footerCol}>
            <h1 className={classes.footerColH1}>Products</h1>
            <ul className={classes.footerColUl}>
              <li className={classes.footerColUlLi}>Webmail</li>
              <li className={classes.footerColUlLi}>Redeem code</li>
              <li className={classes.footerColUlLi}>WHOIS lookup</li>
              <li className={classes.footerColUlLi}>Site map</li>
              <li className={classes.footerColUlLi}>Web templates</li>
              <li className={classes.footerColUlLi}>Email templates</li>
            </ul>
          </div>
          <div className={classes.footerCol}>
            <h1 className={classes.footerColH1}>Products</h1>
            <ul className={classes.footerColUl}>
              <li className={classes.footerColUlLi}>Contact us</li>
              <li className={classes.footerColUlLi}>Web chat</li>
              <li className={classes.footerColUlLi}>Open ticket</li>
            </ul>
          </div>
          <div className={classes.footerCol}>
            <h1 className={classes.footerColH1}>Social</h1>
            <ul className={classes.footerColUl}>
              <li className={classes.footerSocial}>
                <img
                  src="https://svgshare.com/i/5fq.svg"
                  width="32"
                  style={{ width: "32px" }}
                />

                <img
                  src="https://svgshare.com/i/5eA.svg"
                  width="32"
                  style={{ width: "32px" }}
                />

                <img
                  src="https://svgshare.com/i/5f_.svg"
                  style={{ width: "32px" }}
                />
              </li>
            </ul>
          </div>
          <div style={{ height: "12px" }}></div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AppFooter);
