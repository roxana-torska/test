import React from "react";
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

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styles from "../../styles/common";
import Button from "@material-ui/core/Button";
import dish from "../../pages/dish";

const HeroDish = (props) => {
  const { location, classes, dishName, restaurantName, imgSrc, score } = props;
  const img = imgSrc || props.image;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card elevation={0} className={classes.heroDish}>
      <CardHeader
        classes={{
          root: classes.heroDishHeader,
          action: classes.heroDishHeaderActions,
        }}
        title={<div className={classes.heroDishDishName}>{dishName}</div>}
        subheader={
          <div
            className={clsx(
              classes.flex,
              classes.flexJustifyBetween,
              classes.flexAlignCenter
            )}
          >
            <div className={classes.heroDishRestarauntName}>
              {restaurantName}
            </div>
            <div className={classes.heroDishScore}>
              <div className={classes.heroDishScoreFloat}> {score}</div>
              <IconButton aria-label="settings">
                <img
                  style={{ height: "14px" }}
                  src="../../../static/imgs/Assets/SVG/icons/icon-closh.svg"
                ></img>
              </IconButton>
            </div>
          </div>
        }
      />

      <CardMedia
        className={classes.heroDishMedia}
        image={img}
        title={dish.name}
      />
      <CardContent className={clsx(classes.heroDishBottom)}>
        <div className={clsx(classes.flex, classes.flexJustifyBetween)}>
          <Typography className={classes.heroDishDescription}>
            Grandma’s flakey pie crust filled with roast chicken, baby carrots,
            and spring peas.
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
export default withStyles(styles)(connect(null, null)(HeroDish));
