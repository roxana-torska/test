import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/common";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { ScrollTo, ScrollArea } from "react-scroll-to";
import CollapsedDish from "../Dishes/CollapsedDish";

import Button from "@material-ui/core/Button";
//import locationIcon from "../../static/imgs/Assets/SVG/icons/location-icon.svg";

//redux
import { connect } from "react-redux";

function League(props) {
  const { location, classes, dishes, mode, scrollFun, DishesRef } = props;
  const defaultExpanded = mode === "restaurant" ? 0 : 1;
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  var leagueDishes = dishes;

  const handleExpandClick = (place) => {
    console.log(place);
    setExpanded(place);
  };

  let i = 1; //count places

  function compareScore(a, b) {
    if (a["dyneScore"] > b["dyneScore"]) {
      return -1;
    }
    if (a["dyneScore"] < b["dyneScore"]) {
      return 1;
    }
    return 0;
  }

  leagueDishes = leagueDishes && leagueDishes.sort(compareScore);

  return leagueDishes && leagueDishes[0] ? (
    <React.Fragment>
      <div ref={DishesRef}>
        <div className={classes.league}>
          {leagueDishes.slice(0, 5).map((dish) => {
            const restSlug =
              dish.restaurant_id != null ? dish.restaurant_id.slug : "";
            return (
              <CollapsedDish
                handleExpandClick={handleExpandClick}
                dishName={dish.dishName}
                id={dish.iD}
                restaurantName={dish.restaurantName}
                restaurantSlug={restSlug}
                price={"$ " + Math.round(dish.price / 4)}
                expand={expanded}
                description={dish.description}
                score={(function () {
                  return dish.dyneScore ? dish.dyneScore.toFixed(1) : "";
                })()}
                place={i++}
                mode={mode}
                key={i}
              />
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "20px",

          justifyContent: "center",
        }}
      ></div>
    </React.Fragment>
  ) : (
    <div></div>
  );
}

export default withStyles(styles)(connect(null, null)(League));
