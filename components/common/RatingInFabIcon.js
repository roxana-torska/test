import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core';
import styles from '../../styles/common';
import Typography from '@material-ui/core/Typography';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import classnames from 'classnames';
class RatingInFabIcon extends PureComponent {
  render() {
    const { classes, dish, type, onIncrement, onDecrement } = this.props;
    return (
      <React.Fragment>
        <Grid container direction='row'>
          <Grid item xs={4}>
            {' '}
            <ArrowDownward
              className={classes.dishDetailSecColor}
              onClick={evt => onDecrement(evt, type)}
            />
          </Grid>
          <Grid item xs={4}>
            <Avatar
              className={classes.advanceRating}
              classes={{ root: classes.advanceRatingAva }}
            >
              <Typography className={classes.colorPrimary}>
                {dish || 0}
              </Typography>
            </Avatar>
          </Grid>
          <Grid item xs={4}>
            <ArrowUpward
              className={classes.dishDetailSecColor}
              onClick={evt => onIncrement(evt, type)}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(RatingInFabIcon);
