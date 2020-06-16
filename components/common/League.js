import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";

import HeroDish from "./HeroDish";
import CollapsedDish from "./CollapsedDish";
import Typography from "../components/Typography";
import locationIcon from "../../../Assets/SVG/icons/location-icon.svg";

//redux
import { connect } from "react-redux";

const styles = (theme) => ({
  title: {
    padding: theme.spacing(1.2, 1, 1.2, 2),
    textAlign: "center",
    backgroundColor: "var(--gold)",
  },
  location: {
    borderBottom: "1px solid var( --text--dark)",
    width: "min-content",
  },

  description: {
    display: "inline-block",
  },

  mason: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "10px",
    flexWrap: "wrap",
    borderTop: "1px solid var(--silver)",
  },
});

function League(props) {
  const { location, classes, dishes } = props;
  const league = [];
  for (let i in dishes.data) {
    league[i] = dishes.data[i];
    if (i === "4") break;
  }
  league[0] && console.log(league[0]);
  return (
    <React.Fragment>
      {league[0] && (
        <div className={classes}>
          <div className={classes.title}>
            <Typography
              style={{ fontSize: "14px" }}
              variant="h6"
              component="span"
            >
              5 Best in <span className={classes.location}>{location}</span>
            </Typography>
          </div>
          <HeroDish
            place={1}
            dishName={league[0].DishName}
            restaurant={league[0].RestaurantName}
            price={"$" + league[0].Price + " "}
            score={league[0].DyneScore}
            imgSrc={"./Assets/img/dishes" + league[0].PhotoLink}
          />
          <div className={classes.mason}>
            <CollapsedDish
              dishName={league[1].DishName}
              restaurant={"Russian Station"}
              place={2}
              score={"8/10"}
            />

            <CollapsedDish
              dishName={"Seledka Pod Shuboy"}
              restaurant={"Russian Station"}
              place={3}
              score={"8/10"}
            />

            <CollapsedDish
              dishName={"Lomptiki"}
              restaurant={"Russian Station"}
              place={4}
              score={"8/10"}
            />
            <CollapsedDish
              dishName={"Salo Sandwwich"}
              restaurant={"Russian Station"}
              place={5}
              score={"8/10"}
            />
          </div>{" "}
        </div>
      )}
    </React.Fragment>
  );
}

League.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(connect(null, null)(League));
