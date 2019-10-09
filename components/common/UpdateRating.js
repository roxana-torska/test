import React, { Component } from 'react';
import styles from '../../styles/common';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import notify from '../../utils/notifier';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { APP_URL } from '../../utils/config';

class UpdateRating extends Component {
  state = {
    commonRating: null,
    openDialog: false
  };
  handleDecrementRating = event => {
    event.stopPropagation();
  };

  handleIncrementRating = event => {
    event.stopPropagation();
  };

  handleCancel = event => {
    event.stopPropagation();
    const { onCancel } = this.props;
    onCancel(event);
  };

  handleSubmit = event => {
    event.stopPropagation();
  };

  handleMakeAReview = evt => {
    evt.stopPropagation();
    this.setState({ openDialog: false });
  };

  handleDialogClose = evt => {
    evt.stopPropagation();
    this.setState({ openDialog: false });
  };

  render() {
    const {
      classes,
      rating,
      showBorder,
      dishData,
      global: { systemTags }
    } = this.props;
    const { commonRating, openDialog } = this.state;
    const { reviews, ...dish } = dishData;

    return (
      <React.Fragment>
        <Grid
          container
          direction='column'
          justify='space-between'
          alignItems='center'
          spacing={0}
          style={
            showBorder
              ? {
                  minHeight: `132px`,
                  borderLeft: '1px solid #f5f5f5'
                }
              : {}
          }
          className={classnames(
            classes.listCardImageFullWidth,
            classes.quickReviewCard
          )}
        >
          <Grid item style={{ width: '100%' }}>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
            >
              <Grid item xs={4}>
                <Button
                  variant='contained'
                  className={classes.listCardActionButton}
                  style={{
                    borderBottomRightRadius: '4px',
                    color: '#fff'
                  }}
                  onClick={this.handleDecrementRating}
                  classes={{ root: classes.listCardActionButtonRoot }}
                >
                  <RemoveIcon />
                </Button>
              </Grid>
              <Grid item xs={4} style={{ textAlign: 'center' }} />
              <Grid item xs={4} style={{ textAlign: 'right' }}>
                <Button
                  variant='contained'
                  className={classes.listCardActionButton}
                  style={{ borderBottomLeftRadius: '4px' }}
                  onClick={this.handleIncrementRating}
                  classes={{ root: classes.listCardActionButtonRoot }}
                >
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: '100%', textAlign: 'center' }}>
            <div className={classes.reviewRating}>
              {commonRating ? commonRating : rating}
            </div>
          </Grid>
          <Grid item style={{ width: '100%' }}>
            {' '}
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={0}
            >
              <Grid item xs={4}>
                <Button
                  variant='contained'
                  className={classnames(
                    classes.listCardActionButton,
                    classes.listCardActionButtonMin
                  )}
                  style={{ borderTopRightRadius: '4px' }}
                  onClick={this.handleCancel}
                  classes={{ root: classes.listCardActionButtonRoot }}
                >
                  <ClearIcon style={{ color: '#fff' }} />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.reviewRating} />
              </Grid>
              <Grid item xs={4} style={{ textAlign: 'right' }}>
                <Button
                  variant='contained'
                  className={classnames(
                    classes.listCardActionButton,
                    classes.listCardActionButtonMin
                  )}
                  style={{ borderTopLeftRadius: '4px' }}
                  onClick={this.handleSubmit}
                  classes={{ root: classes.listCardActionButtonRoot }}
                >
                  <DoneIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    global: state.global
  }),
  {}
)(withStyles(styles)(UpdateRating));
