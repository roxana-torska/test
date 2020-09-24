import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "../../styles/common";
import { APP_URL } from "../../utils/config";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import actions from "../../redux/global/actions";
import { connect } from "react-redux";
const { toggleFilterMenu } = actions;

class UserMenu extends Component {
  handleSignOut = () => {
    window.location.href = `/sign-out`;
  };
  menuItems = ["Top 5", "Leagues", "My Profile", "Friends", "Restaurants"];
  render() {
    const { open, userProfile, anchorEl, userMenuClose, classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.verticalMenu}>
          {this.menuItems.map((item) => (
            <div key={item} className={classes.verticalMenuItem}>
              {item}
            </div>
          ))}
        </div>
        <div className={classes.verticalMenuBottomItems}>
          <div className={classes.verticalMenuBottomItem}>Home</div>
          <div className={classes.verticalMenuBottomItem}>Join us</div>
          <div className={classes.verticalMenuBottomItem}>Legal</div>
          <div
            onClick={(e) => {
              toggleFilterMenu({ drawerOpen: false });
              this.handleSignOut(e);
            }}
            className={classes.verticalMenuBottomItem}
          >
            Sign Out
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  (state) => ({
    drawerOpen: state.global.drawerOpen,
  }),
  { toggleFilterMenu }
)(withStyles(styles)(UserMenu));
