import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import styles from '../../styles/common';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon';

class ListCardItem extends Component {
  state = {
    winHeight: '100%'
  };
  getImageClass = () => {
    const { classes, fullWidthImage } = this.props;
    let tempClass = classes.listCardImage;
    if (fullWidthImage) {
      tempClass = classes.listCardImageFullWidth;
    }
    return tempClass;
  };
  render() {
    const {
      title,
      description,
      image,
      actionItems,
      footerItems,
      classes
    } = this.props;
    const { winHeight } = this.state;
    let hasActionItems = false;
    let colMb = 8;
    let colLap = 11;
    let colPad = 8;
    let actionColMb = 2;
    let actionColLap = 1;
    let actionColPad = 2;
    if (actionItems) {
      hasActionItems = true;
      colMb = 6;
      colLap = 10;
      colPad = 6;
    }
    if (!image) {
      colMb = 8;
      colLap = 8;
      colPad = 8;
      actionColMb = 4;
      actionColLap = 4;
      actionColPad = 4;
    }

    return (
      <Grid
        container
        direction='row'
        spacing={0}
        className={classes.listCardItem}
        wrap='nowrap'
      >
        {image ? (
          <Grid item xs={4} md={2} sm={4} lg={1}>
            <img src={image} alt={title} className={this.getImageClass()} />
          </Grid>
        ) : null}

        <Grid
          item
          xs={colMb}
          md={colLap}
          sm={colPad}
          lg={colLap}
          style={{ padding: '10px' }}
          zeroMinWidth
        >
          <Grid
            container
            direction='column'
            justify='space-between'
            alignItems='center'
            spacing={0}
            // style={{
            //   height: winHeight
            // }}
          >
            <Grid
              item
              className={classes.listCardTitle}
              style={{ width: '100%' }}
            >
              {title}
            </Grid>
            <Grid
              item
              className={classes.listCardDescription}
              style={{ width: '100%' }}
            >
              {description ||
                'In order for the item to stay within the container you need to set min-width: 0'}
            </Grid>
            <Grid item style={{ width: '100%' }}>
              {footerItems}
            </Grid>
          </Grid>
        </Grid>
        {hasActionItems ? (
          <Grid
            item
            xs={actionColMb}
            md={actionColLap}
            sm={actionColPad}
            lg={actionColLap}
          >
            {actionItems}
          </Grid>
        ) : null}
      </Grid>
    );
  }
}

export default withStyles(styles)(ListCardItem);
