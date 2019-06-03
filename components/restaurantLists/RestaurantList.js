import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import styles from '../../styles/common';
import { withStyles } from '@material-ui/core';
import ListCardItem from '../card/listCardItem';
import Grid from '@material-ui/core/Grid';
import Directions from '@material-ui/icons/Directions';
import classnames from 'classnames';
import StarRate from '@material-ui/icons/StarRate';

class RestaurantList extends PureComponent {
  getItemLists = (el, listItemOnClick, key) => {
    const { classes, selectedIndex, listItemClass } = this.props;
    return (
      <ListItem
        key={`rest_${key}`}
        button
        component='div'
        href='#'
        selected={selectedIndex === key}
        alignItems='flex-start'
        // onClick={evt => listItemOnClick(evt, key, el)}
        className={classes.listItem}
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
                  <span>{el.totalReviews}</span>
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
                <Grid item xs={12}>
                  <div>
                    <Directions className={classes.reviewFooterItemIcon} />
                    {el.distance}
                    <span> km</span>
                  </div>
                </Grid>
              ) : (
                ''
              )}
            </Grid>
          }
        />
      </ListItem>
    );
  };
  render() {
    const { listData, listItemOnClick, classes } = this.props;
    let listLayout = [];
    listData.forEach((el, index) => {
      listLayout.push(this.getItemLists(el, listItemOnClick, index));
    });
    return <List className={classes.listRoot}>{listLayout}</List>;
  }
}

export default withStyles(styles)(RestaurantList);
