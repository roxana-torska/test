import React from "react";
import { withStyles } from "@material-ui/core/styles";

import styles from "../../styles/common";

import { connect } from "react-redux";

const SearchBox = (props) => {
  const { classes, SearchBox } = props;

  return (
    <input
      autoFocus
      placeholder="Search Dishes, Restaurants or people"
      type="text"
      value={props.inputValue}
      onChange={(e) => {
        props.OnChange(e.target.value || "");
      }}
    ></input>
  );
};

export default connect(null, null)(withStyles(styles)(SearchBox));
