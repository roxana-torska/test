import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import styles from '../../styles/common';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import StarRate from '@material-ui/icons/StarRate';
import Directions from '@material-ui/icons/Directions';
import ListCardItem from '../../components/card/listCardItem';
import classnames from 'classnames';

class SponsoredRestaurantsList extends PureComponent {
  getItemLists = (el, key) => {
    const { classes, selectedIndex, listItemOnClick } = this.props;
    return (
      <ListItem
        key={`rest_${key}`}
        button
        component='div'
        href='#'
        selected={selectedIndex === key}
        alignItems='flex-start'
        className={classes.listItem}
        //  onClick={evt => listItemOnClick(evt, key, el)}
      >
        <ListCardItem
          title={
            <Grid container direction='row' spacing={0} wrap='nowrap'>
              <Grid item xs={9} className={classes.nameEllipsis}>
                {el.primary}
              </Grid>
              <Grid
                item
                xs={3}
                className={classnames(
                  classes.listCardFooterPrice,
                  classes.restaurantReviews
                )}
              >
                <div style={{ textAlign: 'right' }}>
                  <StarRate className={classes.reviewFooterItemIcon} />{' '}
                  <span>{el.totalReviews || 0}</span>
                </div>
              </Grid>
            </Grid>
          }
          description={el.secondary}
          image={el.avatar || '/static/imgs/image-not-found-dark.png'}
          fullWidthImage={false}
          footerItems={
            <Grid
              container
              direction='row'
              spacing={0}
              className={classes.reviewFooterItem}
            >
              {el.distance !== null ? (
                <Grid item xs={4}>
                  <div>
                    <Directions className={classes.reviewFooterItemIcon} />
                    {el.distance}
                    <span> km</span>
                  </div>
                </Grid>
              ) : (
                <Grid item xs={4} />
              )}

              <Grid item xs={8} style={{ textAlign: 'right' }}>
                <div>
                  Powered by <span style={{ color: '#f82100' }}>Dishin</span>
                </div>
              </Grid>
            </Grid>
          }
        />
      </ListItem>
    );
  };
  render() {
    const { listData, classes } = this.props;
    let listLayout = [];
    listData.forEach((el, index) => {
      listLayout.push(this.getItemLists(el, index));
    });
    return <List className={classes.listRoot}>{listLayout}</List>;
  }
}

export default withStyles(styles)(SponsoredRestaurantsList);
