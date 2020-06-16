import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductLayout from "./ProductLayout";
import iconClosh from "../../../Assets/SVG/icons/icon-closh.svg";

const backgroundImage =
  "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80";

const styles = (theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    whiteSpace: "nowrap",
    margin: "10px 20px",
    color: "var(--text--dark)",
    borderBottom: "1px solid var(--silver)",
  },
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center",

    boxSizing: "border-box",
  },
  card: {
    display: "flex",
    width: "100%",

    backgroundColor: "white",
    marginBottom: "15px",
    boxSizing: "border-box",
  },
  podium: { transform: "translate(0px, 20px)" },
  nameNrest: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "15px",
  },
  description: {
    marginTop: "-3px",
  },
  rating: {
    padding: theme.spacing(3.5, 0, 0.75, 2),
    borderLeft: "2px solid #28282a",
  },
  arrow: {
    padding: theme.spacing(3.5, 0, 0.75, 0),
  },
  place: {
    fontSize: "50px",
    lineHeight: "0px",
    fontWeight: 500,
  },
});

function CollapsedDish(props) {
  const { classes, place, restaurant, dishName, score, price } = props;

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.card}>
          <div className={classes.podium}>
            <Typography className={classes.place} variant="h1" component="span">
              {place}
            </Typography>
          </div>
          <div className={classes.nameNrest}>
            <Typography className={classes.name} variant="h4" component="span">
              {dishName}
            </Typography>
            <div
              style={{
                display: "flex",
                width: "280px",
                justifyContent: "space-between",
                padding: "6px 0px",
              }}
            >
              <Typography
                className={classes.restaurant}
                variant="h6"
                component="span"
              >
                {restaurant}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

CollapsedDish.propTypes = {};

export default withStyles(styles)(CollapsedDish);
