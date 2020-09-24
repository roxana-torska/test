import React, { Fragment } from "react";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import styles from "../../styles/common";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const Review = (props) => {
  const { classes, review } = props;

  return (
    <Fragment>
      <Card key={props.key} className={classes.reviewCard}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <span style={{ fontWeight: 300, fontSize: "15px" }}>
              Ronen Agmon
            </span>
          }
          subheader={<span style={{ fontWeight: 300 }}>Now</span>}
        />

        <CardContent>
          <Typography
            style={{
              fontSoze: "16px",
              fontWeight: 300,
              margin: "-15px 0px 0px 10px",
            }}
            color="textSecondary"
          >
            <span style={{ fontWeight: 300, fontSize: "14px" }}>
              <strong className={classes.bold}>{review.dishName} </strong>
              {review.review}
            </span>
          </Typography>
        </CardContent>
        <CardActions
          style={{
            fontSoze: "14px",
            fontWeight: 300,
            margin: "-15px 0px 0px -30px",
          }}
          disablespacing="true"
        >
          <IconButton aria-label="add to favorites"></IconButton>
          <IconButton
            className={clsx(classes.dyneScore, {})}
            aria-label="share"
          >
            <ArrowUpwardIcon style={{ width: "18px" }} />
            143
          </IconButton>
          <Button
            className={classes.link}
            style={{ width: "18px", textDecoration: "underline" }}
            aria-label="show more"
          >
            Upvote
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};
export default connect()(withStyles(styles)(Review));
