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
          <div>
            <div
              style={{
                color: "white",

                marginTop: "12px",
                display: "flex",
                justifyContent: "centerhhu",
                alignItems: "center",
              }}
            >
              <img
                style={{ filter: "invert(1)", width: "100px" }}
                src="/static/imgs/logo.svg"
              ></img>
            </div>
            <div className={classes.footerCol}>
              <ul className={classes.footerColUl}>
                <h1 className={classes.footerColH1}>Leagues</h1>
                <hr
                  style={{
                    backgroundColor: "white",
                    boederColor: "white",
                    color: "white",
                    outlineColor: "white",
                    width: "30px",
                  }}
                ></hr>
                <li className={classes.footerColUlLi}>All</li>
                <li className={classes.footerColUlLi}>Trending</li>
                <li className={classes.footerColUlLi}>Breakfast</li>
                <li className={classes.footerColUlLi}>Lunch</li>
                <li className={classes.footerColUlLi}>Dinner</li>
                <li className={classes.footerColUlLi}>Night Out</li>
              </ul>
            </div>
            <div className={classes.footerCol}>
              <ul className={classes.footerColUl}>
                <h1 className={classes.footerColH1}>Cities</h1>
                <hr
                  style={{
                    backgroundColor: "white",
                    boederColor: "white",
                    color: "white",
                    outlineColor: "white",
                    width: "30px",
                  }}
                ></hr>
                <li className={classes.footerColUlLi}>Tel Aviv</li>
                <li className={classes.footerColUlLi}>New York</li>
                <li className={classes.footerColUlLi}>Tokio</li>
                <li className={classes.footerColUlLi}>Los Angeles</li>
                <li className={classes.footerColUlLi}>San Fransisco</li>
              </ul>
            </div>
          </div>
          <div>
            <div style={{ height: "55px" }}></div>
            <div className={classes.footerCol}>
              <ul className={classes.footerColUl}>
                <h1 className={classes.footerColH1}>Navigation</h1>
                <hr
                  style={{
                    backgroundColor: "white",
                    boederColor: "white",
                    color: "white",
                    outlineColor: "white",
                    width: "30px",
                  }}
                ></hr>
                <li className={classes.footerColUlLi}>Home</li>
                <li className={classes.footerColUlLi}>Search Dishes</li>
                <li className={classes.footerColUlLi}>Profile</li>
                <li className={classes.footerColUlLi}>Sign-Out</li>
              </ul>
            </div>
            <div className={classes.footerCol}>
              <ul className={classes.footerColUl}>
                <h1 className={classes.footerColH1}>More</h1>
                <hr
                  style={{
                    backgroundColor: "white",
                    boederColor: "white",
                    color: "white",
                    outlineColor: "white",
                    width: "30px",
                  }}
                ></hr>
                <li className={classes.footerColUlLi}>Legal</li>
                <li className={classes.footerColUlLi}>Join us</li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ height: "40px" }}></div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AppFooter);
