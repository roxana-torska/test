import React, { PureComponent } from 'react';
import { withStyles, Icon, Tooltip } from '@material-ui/core';
import styles from '../../styles/common';
import Typography from '@material-ui/core/Typography';
import { AddCircleOutlineRounded, RemoveCircleOutlineRounded } from "@material-ui/icons/";
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from '@material-ui/core/Button';
class RatingInFabIcon extends PureComponent {
  state = {
    dish: 0,
    open: false,

  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    })
  };

  handleClose = () => {
    this.setState({
      open: false,
    })
  };
  onIncreament = () => {
    this.setState({
      dish: this.state.dish + 1
    })
  }
  render() {
    const { classes, type, } = this.props;
    return (
      <React.Fragment>
        <Tooltip title="Add Review " interactive>
          <Grid container direction='row'>
            <Grid item xs={4}>
              {' '}

              <RemoveCircleOutlineRounded />

            </Grid>
            <Grid item xs={4}>


              <Typography
                className={classes.colorPrimary}
                style={{
                  height: "25px",
                  width: "25px",
                  marginLeft: "40%",
                  borderRadius: "50%",
                  border: "1px solid grey",
                }}>
                {this.state.dish}
              </Typography>


            </Grid>
            <Grid item xs={4}>
              <AddCircleOutlineRounded onClick={this.handleClickOpen} />
            </Grid>
            {/* <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle id="draggable-dialog-title">
              Subscribe
        </DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates
                occasionally.
          </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
          </Button>
              <Button onClick={this.handleClose} color="primary">
                Subscribe
          </Button>
            </DialogActions>
          </Dialog> */}
          </Grid>
        </Tooltip>

      </React.Fragment >
    );
  }
}
export default withStyles(styles)(RatingInFabIcon);
