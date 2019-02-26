import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import styles from '../../styles/common';
import { withStyles } from '@material-ui/core';
class CustomInput extends PureComponent {
	render() {
		const { id, label, error, helperText, onChange, classes } = this.props;
		return <TextField
			id={id}
			label={label}
			className={classes.inputField}
			margin='normal'
			FormHelperTextProps={{
				classes: {
					root: classes.inputHelperText
				}
			}}
			InputLabelProps={{
				classes: {
					root: classes.inputLabel,
					focused: classes.cssFocused
				}
			}}
			InputProps={{
				classes: { underline: classes.inputUnderline }
			}}
			error={error}
			helperText={<span>{helperText}</span>}
			onChange={onChange}
			fullWidth
		/>
	}
}

export default withStyles(styles)(CustomInput);