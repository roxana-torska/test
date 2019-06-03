import React from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import CheckIcon from '@material-ui/icons/Check';
import styles from '../../styles/common';
import { withStyles } from '@material-ui/core';
import {
  veganIcon,
  kosherIcon,
  glutenFreeIcon,
  fishIcon,
  vegetarianIcon,
  meatIcon,
  milkIcon,
  halalIcon
} from '../customIcon/customIcon';

const tagIcons = {
  vegan: veganIcon,
  kosher: kosherIcon,
  glutenfree: glutenFreeIcon,
  fish: fishIcon,
  vegetarian: vegetarianIcon,
  meat: meatIcon,
  milk: milkIcon,
  halal: halalIcon
};
class CustomMultiSelectList extends React.Component {
  handleItemClick = (evt, name, totalCount) => {
    evt.preventDefault();
    const { multiListItemClick, selected } = this.props;
    if (selected.includes(name)) {
      selected.splice(selected.indexOf(name), 1);
      totalCount = totalCount * -1;
    } else {
      selected.push(name);
    }
    multiListItemClick('tags', selected, totalCount);
  };

  getItemLists = (item, key) => {
    const { selected } = this.props;
    let TagIcon = tagIcons[item.primary.replace(' ', '').toLowerCase()];
    return (
      <ListItem
        key={`rest_${key}`}
        button
        component='div'
        selected={selected.includes(item.primary)}
        href='#'
        alignItems='flex-start'
        onClick={evt =>
          this.handleItemClick(evt, item.primary, item.totalCount)
        }
      >
        <Grid container direction='row' spacing={0}>
          <Grid item xs={3}>
            <TagIcon />
          </Grid>
          <Grid item xs={5}>
            {item.primary}
          </Grid>
          <Grid item xs={2}>
            ({item.totalCount})
          </Grid>
          <Grid item xs={2}>
            {selected.includes(item.primary) ? (
              <CheckIcon style={{ color: '#f44335' }} />
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </ListItem>
    );
  };
  render() {
    const { listData, classes } = this.props;
    let listLayout = [];
    listData.map((el, index) => {
      listLayout.push(this.getItemLists(el, index));
    });
    return <List className={classes.listMultiItem}>{listLayout}</List>;
  }
}

export default withStyles(styles)(CustomMultiSelectList);
