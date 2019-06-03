import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import styles from '../../styles/common';
import { withStyles, InputAdornment } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import classnames from 'classnames';
class CustomInput extends PureComponent {
  render() {
    const {
      id,
      label,
      error,
      helperText,
      onChange,
      classes,
      value,
      type,
      InputProps,
      locationAdornment
    } = this.props;
    return (
      <TextField
        id={id}
        label={label}
        type={type}
        className={classnames(classes.inputFieldGrey, classes.marginNormal)}
        margin='normal'
        value={value}
        FormHelperTextProps={{
          classes: {
            root: classes.inputHelperText
          }
        }}
        InputLabelProps={{
          classes: {
            root: classnames(classes.inputLabel, classes.fontInherit),
            focused: classes.cssFocused
          }
        }}
        InputProps={{
          classes: { underline: classes.inputUnderline },
          endAdornment: locationAdornment ? (
            <InputAdornment position='end'>
              <RoomIcon style={{ color: '#c4c4c4' }} />
            </InputAdornment>
          ) : (
            ''
          ),
          ...InputProps
        }}
        error={error}
        helperText={helperText ? <span>{helperText}</span> : ''}
        onChange={onChange}
        fullWidth
      />
    );
  }
}

export default withStyles(styles)(CustomInput);
