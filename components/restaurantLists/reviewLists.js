import React, { PureComponent } from 'react';
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
import ListCardItem from '../../components/card/listCardItem';
import AddIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Minimize';
import Button from '@material-ui/core/Button';

class ReviewList extends PureComponent {
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
        //onClick={evt => listItemOnClick(evt, key)}
        className={classes.listItem}
      >
        <ListCardItem
          title={el.primary}
          description={el.secondary}
          image={el.avatar || '/static/imgs/image-not-found-dark.png'}
          fullWidthImage={true}
          footerItems={
            <Grid
              container
              direction='row'
              spacing={0}
              className={classes.reviewFooterItem}
            >
              <Grid item xs={6}>
                <div>
                  You rated
                  <span style={{ color: '#f44335' }}> {el.rating}</span>
                </div>
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'right' }}>
                <SvgIcon
                  viewBox='0 0 24 24'
                  className={classes.reviewFooterItemIcon}
                >
                  <path fill='none' d='M0 0h24v24H0V0z' />
                  <path d='M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z' />
                </SvgIcon>
                Share
              </Grid>
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

export default withStyles(styles)(ReviewList);
