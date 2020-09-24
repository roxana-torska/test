import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Router from "next/router";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styles from "../../styles/common";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import iconClosh from "../../static/imgs/Assets/SVG/icons/icon-closh.svg";

function CollapsedDish(props) {
  const {
    x,
    id,
    classes,
    place,
    dishName,
    price,
    score,
    description,
    restaurantName,
    restaurantSlug,
    expand,
    handleExpandClick,
  } = props;

  var expanded;
  if (expand == place) {
    expanded = true;
  }

  const dishSlug = dishName.toLowerCase().replace(/\s/g, "-");
  return (
    <Fragment>
      <Card
        style={{ overflow: "visible" }}
        onClick={() => {
          if (!expanded) {
            handleExpandClick(place);
          }
        }}
        spacing={0}
        elevation={0}
        className={classes.collapsedDish}
      >
        <CardHeader
          classes={{
            root: classes.heroDishHeader,
            action: classes.heroDishHeaderActions,
          }}
          avatar={
            <Avatar aria-label="recipe" className={classes.collapsedDishAvatar}>
              <img
                className={classes.collapsedDishAvatarImg}
                src={
                  "../../../static/imgs/Assets/SVG/icons/place" + place + ".svg"
                }
              ></img>
            </Avatar>
          }
          title={
            <div
              className={clsx(
                classes.collapsedDishDishName,
                classes.flex,
                classes.flexAlignCenter,
                classes.flexJustifyBetween
              )}
            >
              <span>{dishName.slice(0, 20)}</span>
            </div>
          }
          subheader={
            <div className={classes.collapsedSubHeader}>
              <span className={classes.collapsedSubHeaderLeft}>
                <Link href={`/restaurants/${restaurantSlug}`}>
                  <a className={classes.collapsedSubHeaderLeft}>
                    {restaurantName}
                  </a>
                </Link>
              </span>
              <span className={classes.collapsedSubHeaderRight}>
                {price} <span className={classes.horLine}>|</span>
                {"  "}
                <img
                  className={classes.iconClosh}
                  alt=""
                  src="../../../static/imgs/Assets/SVG/icons/icon-closh.svg"
                ></img>
                {"  "}
                {score}
              </span>
            </div>
          }
        />

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {" "}
          <CardMedia
            onClick={() => Router.push(`/dish/${dishSlug}`)}
            className={classes.heroDishMedia}
            image={`../../../static/imgs/Dishes/${restaurantName.replace(
              " ",
              "-"
            )}/${dishName.replace(/\s/g, "-")}.jpg`}
            title={"Paella dish"}
          />
          <CardContent className={clsx(classes.heroDishBottom)}>
            <div className={clsx(classes.flex, classes.flexJustifyBetween)}>
              <Typography className={classes.heroDishDescription}>
                {description != null ? description.slice(0, 80) + ". . ." : ""}
              </Typography>
              <Button
                onClick={() => Router.push(`/dish/${dishSlug}`)}
                className={classes.CollapsedDishAction}
                variant="text"
              >
                More
              </Button>
            </div>
          </CardContent>
        </Collapse>
      </Card>
      <hr className={classes.hr}></hr>
    </Fragment>
  );
}
export default withStyles(styles)(connect(null, null)(CollapsedDish));
