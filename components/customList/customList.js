import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import styles from '../../styles/common';
import { withStyles } from '@material-ui/core';

class CustomList extends PureComponent {
  getItemLists = (el, listItemOnClick, key) => {
    const { classes, selectedIndex } = this.props;
    return (
      <ListItem
        key={`rest_${key}`}
        button
        component='a'
        href='#'
        selected={selectedIndex === key}
        alignItems='flex-start'
        onClick={evt => listItemOnClick(evt, key)}
        className={classes.listRootItem}
      >
        <ListItemAvatar>
          <Avatar
            alt={el.primary}
            src={
              el.avatar ? el.avatar : '/static/imgs/image-not-found-dark.png'
            }
          />
        </ListItemAvatar>
        <ListItemText
          classes={{
            primary: classes.listItemTextPrimary
          }}
          primary={el.primary}
          secondary={<React.Fragment>{el.secondary}</React.Fragment>}
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

export default withStyles(styles)(CustomList);
