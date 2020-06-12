import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import iconClosh from "../../../Assets/SVG/icons/icon-closh.svg";

const styles = (theme) => {
  return {
    root: {
      border: "bottom 1px solid var(--silver)",
    },
    background: {
      backgroundColor: "#7fc7d9", // Average color of the background image.
      backgroundPosition: "center",
      borderRadius: "2px",
    },
    card: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "white",
      padding: "10px 20px 0px 20px",
    },
    dishData: {
      display: "flex",
      opacity: "1",
    },
    podium: {
      display: "flex",
      marginRight: "9px",
    },
    nameNrest: {
      display: "flex",
      flexDirection: "column",
      marginLeft: "10px",
    },
    score: { alignSelf: "flex-end" },
    rating: {
      padding: theme.spacing(3.5, 1, 0.75, 2),
      borderLeft: "2px solid #28282a",
    },

    name: {
      marginTop: "3px",
    },
    restaurant: {
      color: "var(--text--dark)",
      borderBottom: "1px solid var( --text--dark)",
      width: "min-content",
      lineHeight: "18px",
      paddingTop: "3px",
    },
    place: {
      fontSize: "60px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: "400",
      lineHeight: "55px",
    },

    order: {
      padding: "0px 20px",
    },
    sectionHeading: {
      fontSize: "16px",
      fontWeight: "700",
    },
    links: { display: "flex", overflow: "hidden" },
    link: {
      marginTop: "10px",

      marginBottom: "20px",
      borderBottom: "1px solid var( --text--dark)",
      width: "min-content",
      fontSize: "16px",
    },
    descriptionContainer: {
      display: " flex",
      padding: "0px 20px 10px 20px",
    },

    score: {
      fontSize: "16px",
      alignSelf: "flex-end",
    },
  };
};

function HeroDish(props) {
  const { classes, place, restaurant, dishName, score, price, imgSrc } = props;
  if (styles) console.log(styles);
  return (
    <React.Fragment>
      <div className={classes.card}>
        <div className={classes.dishData}>
          <div className={classes.podium}>
            <Typography className={classes.place} component="span">
              {place}
            </Typography>
          </div>
          <div className={classes.nameNrest}>
            <Typography variant="h4" component="span" className={classes.name}>
              Seledka Pod Shuboy
            </Typography>
            <Typography
              variant="h6"
              component="span"
              className={classes.restaurant}
            >
              {restaurant}
            </Typography>
          </div>
        </div>
        <div className={classes.score}>
          <Typography variant="h6" component="span" className={classes.score}>
            <img
              src={iconClosh}
              style={{
                marginRight: "-1.5px",
                width: "15px",
                transform: "translate(1px,1px)",
              }}
            />{" "}
            {score} |{"   $30 "}
          </Typography>
        </div>
      </div>
      <ProductHeroLayout imgSrc={imgSrc}>
        {/* Increase the network loading priority of the background image. */}
      </ProductHeroLayout>
      <div className={classes.descriptionContainer}>
        <div className={classes.description}>
          Sexy ass white eggs on a black plate yamm lorem ipsum dolor
        </div>
        <div className={classes.link}>view</div>
      </div>
    </React.Fragment>
  );
}

HeroDish.propTypes = {};

export default withStyles(styles)(HeroDish);
