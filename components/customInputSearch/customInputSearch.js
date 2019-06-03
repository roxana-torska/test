import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import styles from '../../styles/common';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';
import { APP_URL } from '../../utils/config';
class CustomInputSearch extends PureComponent {
  state = {
    fieldValue: ''
  };

  componentDidMount() {
    const { defaultValue } = this.props;
    this.setState({ fieldValue: defaultValue });
  }

  handleChange = fieldValue => {
    this.setState({ fieldValue });
  };

  handleOnClick = () => {
    const { fieldValue } = this.state;
    const { onSearch } = this.props;
    onSearch(fieldValue);
  };

  handleKeyDown = evt => {
    if (evt.keyCode === 13) {
      const { fieldValue } = this.state;
      const { onSearch } = this.props;
      onSearch(fieldValue);
    }
  };

  render() {
    const {
      id,
      label,
      error,
      helperText,
      classes,
      type,
      placeholder,
      onFocus,
      onClear
    } = this.props;
    const { fieldValue } = this.state;
    return (
      <React.Fragment>
        <TextField
          id={id}
          label={label}
          type={type}
          className={classes.inputWhiteField}
          margin='normal'
          value={fieldValue}
          style={{ margin: '0px' }}
          placeholder={placeholder}
          autoComplete='off'
          FormHelperTextProps={{
            classes: {
              root: classes.inputHelperText
            }
          }}
          InputLabelProps={{
            classes: {
              root: classnames(classes.inputLabel, classes.inputWhiteLabel),
              focused: classes.cssFocused
            }
          }}
          InputProps={{
            classes: {
              root: classnames(classes.inputWhiteField, classes.fontInherit),
              underline: classes.inputWhiteUnderline
            }
          }}
          error={error}
          helperText={helperText ? <span>{helperText}</span> : null}
          onChange={evt => this.handleChange(evt.target.value)}
          onKeyDown={this.handleKeyDown}
          onFocus={() => onFocus(true)}
          onBlur={() => onFocus(false)}
          fullWidth
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CustomInputSearch);
