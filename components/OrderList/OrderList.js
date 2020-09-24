import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import styles from "../../styles/common";
import Button from "@material-ui/core/Button";
import { searchDishes } from "../../redux/dishes/actions";

import React, { useState } from "react";

import { connect } from "react-redux";

function OrderList(props) {
  function handleSearchTerm(searchTerm) {
    searchDishes(searchTerm, "force");
  }

  const { classes, servicesArray } = props;

  let i = 0;
  return (
    <React.Fragment>
      <div style={{ padding: "20px " }}>
        <div className={classes.dishPageOrderListTitle}>Order from</div>
        <div className={classes.dishPageOrderList}>
          <Button className={classes.dishPageOrderListItem}>Restaurant</Button>
          <div className={classes.devider}></div>
          <Button className={classes.dishPageorderListItem}>
            <img
              className={classes.dishPageOrderListImg}
              src="../static/imgs/Assets/SVG/external-logos/wolt.svg"
            ></img>
          </Button>
          <div className={classes.devider}></div>
          <Button className={classes.dishPageOrderListItem}>
            <img
              className={classes.dishPageOrderListImg}
              src="../static/imgs/Assets/SVG/external-logos/10bis.svg"
            ></img>
          </Button>
          <div className={classes.devider}></div>
          <Button className={classes.dishPageOrderListItem}>
            <img
              className={classes.dishPageOrderListImg}
              src="../static/imgs/Assets/SVG/external-logos/ontopo.svg"
            ></img>
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

OrderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    searchTerm: state.DishesReducer.searchTerm,
  }),
  { searchDishes }
)(withStyles(styles)(OrderList));
