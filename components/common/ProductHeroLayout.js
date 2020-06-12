import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
    position: "relative",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {},
    padding: " 10px 20px",
  },
  container: {
    height: "30vh",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderBottom: "1.3px solid #28282a",
  },
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: -2,
  },
  arrowDown: {
    position: "absolute",
    bottom: theme.spacing(4),
  },
});

function ProductHeroLayout(props) {
  const { backgroundClassName, children, classes, imgSrc } = props;

  return (
    <section className={classes.root}>
      <Container
        style={{
          backgroundImage: `url('/img/dishes/Allora/Allorasalad.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className={classes.container}
      >
        <div className={clsx(classes.background, backgroundClassName)} />
      </Container>
    </section>
  );
}

ProductHeroLayout.propTypes = {
  backgroundClassName: PropTypes.string.isRequired,

  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHeroLayout);
