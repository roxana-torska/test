import React from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import CustomInput from '../customInput/CustomInput';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from '../../styles/common';
import { Typography, Avatar, ListItemIcon } from '@material-ui/core';
import actions from '../../redux/global/actions';
import { connect } from 'react-redux';

const { setSearchValue } = actions;

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;
  return (
    <CustomInput
      InputProps={{
        inputRef: ref,
        ...InputProps
      }}
      locationAdornment={true}
      {...other}
    />
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
  classes
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
  console.log("suggetions======>", suggestion);
  return (
    <MenuItem
      {...itemProps}
      key={`${suggestion.label}_${index}`}
      selected={isHighlighted}
      component='div'
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
      className={classes.autoCompleteMenuItem}
    >
      <ListItemIcon>
        <Avatar
          alt={`${suggestion.label}`}
          src={
            suggestion.avatar
              ? suggestion.avatar
              : '/static/imgs/image-not-found-dark.png'
          }
          className={classes.autoCompleteAvatar}
        />
      </ListItemIcon>
      <Typography variant='inherit'>{suggestion.label}</Typography>
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

//let searchText = null;
class AutoComplete extends React.Component {
  selectedItem = null;
  stateReducer = (state, changes) => {
    // this prevents the menu from being closed when the user
    // selects an item with a keyboard or mouse
    const { setSearchValue } = this.props;
    setSearchValue(state.inputValue);
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        const inputValue = state.inputValue;
        this.selectedItem = {
          ...changes,
          highlightedIndex: state.highlightedIndex
        };
        const newState = {
          ...changes,
          isOpen: state.isOpen,
          //      inputValue: inputValue,
          selectedItem: null,
          highlightedIndex: state.highlightedIndex
        };
        return newState;
      case Downshift.stateChangeTypes.touchEnd:
      case Downshift.stateChangeTypes.mouseUp:
      case Downshift.stateChangeTypes.blurInput:
        // case Downshift.stateChangeTypes.changeInput:
        return state;
      default:
        return changes;
    }
  };
  getSuggestions = value => {
    const { data } = this.props;
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;

    //searchText = inputValue;
    let count = 0;
    return inputLength === 0
      ? data
      : data.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
  };

  render() {
    const { classes, id, name, placeholder, isOpen } = this.props;
    return (
      <Downshift
        id={id}
        isOpen={isOpen}
        defaultIsOpen={true}
        stateReducer={this.stateReducer}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem
        }) => (
            <div className={classes.autoCompleteContainer}>
              {renderInput({
                id: name,
                label: '',
                InputProps: getInputProps({
                  placeholder: placeholder
                })
              })}
              <div {...getMenuProps()} className={classes.autoCompleteListCT}>
                {isOpen ? (
                  <Paper
                    className={classnames(
                      classes.autoCompletePaper,
                      'autoCompleteScroll'
                    )}
                    square
                  >
                    {this.getSuggestions(inputValue).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.label }),
                        highlightedIndex,
                        selectedItem,
                        classes
                      })
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          )}
      </Downshift>
    );
  }
}

export default connect(
  state => ({
    global: state.global
  }),
  {
    setSearchValue
  }
)(withStyles(styles)(AutoComplete));
