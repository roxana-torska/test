import React, { Component } from 'react';
import styles from '../../styles/common';
import { withStyles, Typography } from '@material-ui/core';
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
import { css } from 'emotion';

class UpdateRating extends Component {
  state = {
    commonRating: 0,
    showThankyou: false,
    openDialog: false
  };
  Share = () => {
    console.log("share clicked");
    window.location.href = "/social-medialist"
  }
  handleDecrementRating = event => {
    event.stopPropagation();
    let { commonRating } = this.state;
    if (commonRating >= 0) {
      this.setState({
        commonRating: commonRating - 1,
      })
    }
  };

  handleIncrementRating = event => {
    event.stopPropagation();
    let { commonRating } = this.state;
    if (commonRating < 10) {
      this.setState({
        commonRating: commonRating + 1,
      })
    }
  };

  handleCancel = event => {
    event.stopPropagation();
    const { onCancel } = this.props;
    onCancel(event);
  };

  handleSubmit = event => {
    event.stopPropagation();
    const { commonRating } = this.state;
    const { dishData } = this.props
    console.log("data==>", dishData)
    this.props.onSubmit(dishData.type, commonRating, dishData.id)
    setTimeout(() => {
      this.setState({
        showThankyou: true
      })
    }, 2000);
  };

  handleMakeAReview = evt => {
    evt.stopPropagation();
    this.setState({ openDialog: false });
  };

  handleDialogClose = evt => {
    evt.stopPropagation();
    this.setState({ openDialog: false });
  };
  componentDidMount = () => {
    this.setState({
      commonRating: this.props.rating
    })
  }
  render() {
    const {
      classes,
      rating,
      showBorder,
      dishData,

      global: { systemTags }
    } = this.props;
    let { commonRating, openDialog } = this.state;
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

              </Grid>
              <Grid item xs={4} style={{ textAlign: 'center' }} />
              <Grid item xs={4} style={{ textAlign: 'right' }}>

              </Grid>
            </Grid>
          </Grid>
          {!this.state.showThankyou ? <Grid item
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.reviewRating}
          >

            <Grid item xs={4} >
              <Button
                variant='contained'
                className={classes.listCardActionButton}
                style={{
                  borderBottomRightRadius: '4px',
                  color: '#fff',
                  marginRight: "15%"
                }}
                onClick={this.handleDecrementRating}
                classes={{ root: classes.listCardActionButtonRoot }}
              >
                <RemoveIcon />
              </Button>
            </Grid>
            <Grid item xs={4} >
              <div style={{
                diplay: "flex", justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
              }}>
                {commonRating ? commonRating : rating}
              </div>
            </Grid>
            <Grid item xs={4} >
              <Button
                variant='contained'
                className={classes.listCardActionButton}
                style={{
                  borderBottomLeftRadius: '4px',
                  marginLeft: "15%",
                  float: "right"
                }}
                onClick={this.handleIncrementRating}
                classes={{ root: classes.listCardActionButtonRoot }}
              >
                <AddIcon />
              </Button>
            </Grid>

          </Grid> : <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.reviewRating}>
              <Typography className={
                css`
                font-family: Lato;
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 20px;
                /* or 167% */


                color: #FFFFFF;
                `
              }>
                Thank you!
                </Typography>
            </Grid>}
          <Grid item style={{ width: '100%' }}>
            {' '}
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={0}
              style={{
                background: "#bb454557"
              }}
            >

              {!this.state.showThankyou ? <Grid item xs={12} sm={12} lg={12}>
                <Button
                  onClick={this.handleSubmit}
                  className={
                    css`
                    background:#bb454557;
                    opacity: 1;
                    width:100%;
                    
                `
                  }

                >
                  <Typography

                    className={
                      css`
                    
                    font-family: Lato;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 20px;
                    /* or 167% */


                    color: #FFFFFF;
                    
                    `
                    }

                  >
                    Rate
                  </Typography>
                </Button>
              </Grid> : <Grid item xs={12} sm={12} lg={12}>
                  <Button
                    onClick={this.Share}
                    className={
                      css`
                        background:#bb454557;
                        width:100%;
                `
                    }

                  >
                    <Typography

                      className={
                        css`
                    
                    font-family: Lato;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 20px;
                    /* or 167% */

                    background:#bb454557;
                    color: #FFFFFF;
                    
                    `
                      }

                    >
                      Share
                  </Typography>
                  </Button>
                </Grid>}
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
