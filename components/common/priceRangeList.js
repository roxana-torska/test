import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import styles from '../../styles/common';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CheckIcon from '@material-ui/icons/Check';

class PriceRangeList extends React.Component {
  handleItemClick = (evt, selectedValue, totalCount) => {
    evt.preventDefault();
    const { listItemClick, selected } = this.props;
    if (selectedValue === selected) {
      selectedValue = '';
      totalCount = 0;
    }
    listItemClick(selectedValue, totalCount);
  };

  getItemLists = (item, key) => {
    const { selected, classes } = this.props;
    let color = '#a5a5a5';
    let itemSelected = false;
    if (selected === item.primary) {
      color = '#f44335';
      itemSelected = true;
    }
    return item.totalCount > 0 ? (
      <ListItem
        key={`rest_${key}`}
        button
        component='div'
        href='#'
        alignItems='flex-start'
        onClick={evt =>
          this.handleItemClick(evt, item.primary, item.totalCount)
        }
        className={classes.listItem}
      >
        <Grid container direction='row' spacing={0}>
          <Grid item xs={4}>
            <div style={{ color }}>{item.unit + item.primary}</div>
          </Grid>
          <Grid item xs={4}>
            <div style={{ color }}>({item.totalCount})</div>
          </Grid>
          <Grid item xs={4}>
            {itemSelected ? <CheckIcon style={{ color }} /> : ''}
          </Grid>
        </Grid>
      </ListItem>
    ) : (
      ''
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

export default withStyles(styles)(PriceRangeList);
