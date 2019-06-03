import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils/helpers';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FilterList from '@material-ui/icons/FilterList';
import SwapVert from '@material-ui/icons/SwapVert';
import styles from '../../styles/common';
import { FilterMenuIcon } from '../customIcon/customIcon';
import ClearIcon from '@material-ui/icons/Clear';

class SpeedDials extends React.Component {
  state = {
    direction: 'up',
    open: false,
    hidden: false
  };

  handleClick = () => {
    const { changeOverlay } = this.props;
    this.setState(state => ({
      open: !state.open
    }));
    changeOverlay(this.state.open);
  };

  handleDirectionChange = (event, value) => {
    this.setState({
      direction: value
    });
  };

  handleHiddenChange = (event, hidden) => {
    this.setState(state => ({
      hidden,
      // hidden implies !open
      open: hidden ? false : state.open
    }));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleSortClick = () => {
    const { sortClick } = this.props;
    this.setState({ open: false });
    sortClick();
  };

  handleFilterClick = () => {
    const { filterClick } = this.props;
    this.setState({ open: false });
    filterClick();
  };

  render() {
    const { classes } = this.props;
    const { direction, hidden, open } = this.state;

    const speedDialClassName = classNames(
      classes.fabMenu,
      classes[`fabDirection${capitalize(direction)}`]
    );

    return (
      <SpeedDial
        ariaLabel='Filter menu'
        className={speedDialClassName}
        hidden={hidden}
        icon={
          open ? (
            <ClearIcon className={classes.filterMenuIcon} />
          ) : (
            <FilterMenuIcon />
          )
        }
        onClick={this.handleClick}
        onClose={this.handleClose}
        open={open}
        direction={direction}
      >
        <SpeedDialAction
          key='sort'
          icon={<SwapVert />}
          tooltipTitle='Sort'
          className={classes.filterIcon}
          onClick={this.handleSortClick}
        />
        <SpeedDialAction
          key='filterList'
          icon={<FilterList />}
          tooltipTitle='Filter'
          className={classes.filterIcon}
          onClick={this.handleFilterClick}
        />
      </SpeedDial>
    );
  }
}

SpeedDials.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SpeedDials);
