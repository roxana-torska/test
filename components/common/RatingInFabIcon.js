import React, { PureComponent } from 'react';
import { withStyles, Icon, Tooltip, Popover, Button } from '@material-ui/core';
import styles from '../../styles/common';
import Typography from '@material-ui/core/Typography';
import { AddCircleOutlineRounded, RemoveCircleOutlineRounded, Add, Remove, CheckCircleOutlineRounded } from "@material-ui/icons/";
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Modal from './Modal';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
class RatingInFabIcon extends PureComponent {
  state = {
    dish: 0,
    anchorEl: null,
  }


  handleClickOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    })
  };
  render() {
    const { classes, type } = this.props;
    return (
      <React.Fragment>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {popupState => (
            <div>

              <Grid container direction='row' {...bindTrigger(popupState)} >
                <Grid item xs={4}>
                  <RemoveCircleOutlineRounded />
                </Grid>
                <Grid item xs={4}>
                  <Avatar
                    className={classes.advanceRating}
                    classes={{ root: classes.advanceRatingAva }}
                    style={{ float: "right" }}
                  >
                    <Typography className={classes.colorPrimary}>
                      {this.state.dish || 0}
                    </Typography>
                  </Avatar>
                </Grid>
                <Grid item xs={4}>
                  <AddCircleOutlineRounded />
                </Grid>


              </Grid>
              <Popover

                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >

                <Grid container direction='row' style={{ width: "300px", margin: "30px" }}>
                  <Grid item xs={2}>
                    <Remove style={{ float: "right" }} />
                  </Grid>
                  <Grid item xs={4}>
                    <Avatar
                      className={classes.advanceRating}
                      classes={{ root: classes.advanceRatingAva }}
                      style={{ float: "right" }}
                    >
                      <Typography className={classes.colorPrimary} >
                        {this.state.dish || 0}
                      </Typography>
                    </Avatar>
                  </Grid>
                  <Grid item xs={6}  >
                    <Add style={{ float: "right" }} />
                  </Grid>
                </Grid>
                <Grid container direction='row' style={{
                  justifyContent: "center"
                }}>
                  <Grid

                    justify="center"
                    alignItems="center">
                    <Typography
                      style={{
                        fontSize: "24px",
                        borderBottom: "2px solid black"
                      }}
                    >
                      Make a review
                 </Typography>
                  </Grid>
                </Grid>

                <Grid container direction="row">
                  <Grid xs={2} style={{
                    float: "right"
                  }}>
                    <CheckCircleOutlineRounded />
                  </Grid>

                </Grid>

              </Popover>
            </div>
          )}

        </PopupState>
      </React.Fragment >
    );
  }
}
export default withStyles(styles)(RatingInFabIcon);
