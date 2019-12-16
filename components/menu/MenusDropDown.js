
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
	root: {
		width: '100%',
		background: '#FAFAFA'
	},
	heading: {
		fontFamily: 'bebasneue',
		fontSize: '20px',
		lineHeight: '24px',
		/* identical to box height */
		textAlign: 'center',
		color: '#FF2213',
		margin: '0 auto'
	},
	expandedPanel: {
		background: '#F44336',
		'& p': {
			color: '#fff'
		},
	},
	menuItem: {
		listStyleType: 'none',
		'& a': {
			textDecoration: 'none',
			color: '#fff',
			cursor: 'pointer',
			fontFamily: 'Lato',
			fontSize: '13px'
		}
	}
};

class MenusDropdown extends Component {
	render() {
		const { classes, menus, restaurant } = this.props;
		return (
			<div className={classes.root}>
				<ExpansionPanel classes={{ expanded: classes.expandedPanel }}>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography className={classes.heading}>MENUS</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
							{menus.map(elem => {
								const href = `/restaurants/${restaurant.slug}/menu/${elem.name}`;
								return <li className={classes.menuItem} key={elem._id}>
									<a href={href}>{elem.name}</a>
								</li>
							})}
						</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>

			</div>
		)
	}
}

export default withStyles(styles)(MenusDropdown);
	// let element = null;
					// if (props.isOpen === false) 
					// 	element = <h3 onClick={}>MENUS</h3>;
					// } else {
					// 	element = <ul>
					// 		{props.menus.map((elem, ind) => {
					// 			return <li key={ind}>{elem.name}</li>
					// 		})}
					// 	</ul>
					// }
					// return element