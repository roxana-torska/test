import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import styles from "../../styles/common"

class AppFooter extends PureComponent {
	render() {
		const { classes } = this.props;
		return <div className={classnames(classes.root, classes.footerBgIconContainer)}>
			<div className={classes.footerBgIconLeft}></div>
			<div className={classes.footerBgIconRight}></div>
		</div>
	}
}


export default withStyles(styles)(AppFooter);
