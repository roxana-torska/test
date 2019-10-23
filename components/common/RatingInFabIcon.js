import React, { PureComponent } from 'react';
import { withStyles, Icon, Tooltip, Popover, Button } from '@material-ui/core';
import styles from '../../styles/common';
import Typography from '@material-ui/core/Typography';
import { AddCircleOutlineRounded, RemoveCircleOutlineRounded, Add, Remove, CheckCircleOutlineRounded } from "@material-ui/icons/";
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import SaveRating from './SaveRating';
import Modal from './Modal'
class RatingInFabIcon extends PureComponent {
  state = {
    dish: 0,
    anchorEl: null,
    openModal: false,
    openPop: false,
  }

  onIcrement = () => {
    const { dish } = this.state;
    if (dish < 10) {
      this.setState({
        dish: dish + 1,
      })
    }
  }

  onDecrement = () => {
    const { dish } = this.state;
    if (dish > 0) {
      this.setState({
        dish: dish - 1,
      })
    }
  }

  openModal = () => {
    const { dish } = this.state;
    const { dishId, type } = this.props.data;
    this.props.handleOnSubmit(type, dish, dishId);

    this.setState({
      openModal: true,
      openPop: false,
    })
  }
  openPop = (evt) => {
    this.setState({
      openPop: true,
      anchorEl: evt.currentTarget,
    })
  }
  handleCancel = () => {
    this.setState({
      openModal: false,
    })
  }
  handleClose = (evt) => {
    this.setState({
      openPop: false,
      anchorEl: null
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>

        <div>

          <Grid container direction='row' onClick={this.openPop} >
            <Grid item xs={4} sm={2} style={{ marginLeft: "20%" }}>
              <RemoveCircleOutlineRounded />
            </Grid>
            <Grid item xs={2}>
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
            <Grid item xs={2}>
              <AddCircleOutlineRounded />
            </Grid>


          </Grid>




          <Popover

            open={this.state.openPop}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div className={classes.popover}>
              <Grid container direction='row' style={{ width: "100wv", margin: "5%" }}>
                <Grid item xs={5} >
                  <Remove onClick={this.onDecrement} />
                </Grid>
                <Grid item xs={2}>
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
                <Grid item xs={5}  >
                  <Add style={{ float: "right" }} onClick={this.onIcrement} />
                </Grid>
              </Grid>
              <Grid container direction='row'
                style={{
                  width: "100%",
                  marginLeft: "5%",
                  justifyContent: "center"
                }} >
                <Grid

                  justify="center"
                  alignItems="center">
                  <Typography
                    style={{
                      fontSize: "120%",
                      borderBottom: "2px solid black",
                    }}
                  >
                    make a review
                 </Typography>
                </Grid>
              </Grid>
              <SaveRating
                openModal={this.openModal}
                handleClose={this.handleClose}
                handleOnSubmit={this.props.handleOnSubmit} />

            </div>
          </Popover>
          {this.state.openModal && <Modal
            open={this.state.openModal}
            handleCancel={this.handleCancel}
            showDetails={this.props.showDetails}
            classes={this.props.classes}

          />
          }
        </div>

      </React.Fragment >
    );
  }
}
export default withStyles(styles)(RatingInFabIcon);
