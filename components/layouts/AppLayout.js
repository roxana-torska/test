import React, { Component } from 'react'
import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import AppHeader from '../header/AppHeader';
import AppFooter from '../footer/AppFooter';


const headerMarginSuppress = {
	marginTop: '48%'
}
const splashScreen = {
	width: '100vw',
	height: '100vh',
	display: 'flex',
	fontSize: '0px',
	justifyContent: 'center',
	alignItems: 'center',
	margin: '0px',
	padding: '0px'
}
const splashLogo = {

	width: '100px',
	height: '100px',
	backgroundImage: 'url(/static/imgs/logo.png)',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundColor: '#f44336'
}


class AppLayout extends Component {
	state = {
		hideSplash: false,
	};
	componentDidMount() {
		setTimeout(() => {
			this.setState({ hideSplash: true });
		}, 500);
	}
	render() {
		const { children } = this.props;
		const { hideSplash } = this.state;
		console.log('hideSplash', hideSplash);
		return hideSplash ?
			<React.Fragment>
				<AppHeader />
				<div style={headerMarginSuppress} >
					{children}
				</div>
				<AppFooter />
			</React.Fragment>
			: <div style={splashScreen}><div style={splashLogo}></div></div>
	}
}

export default observer(AppLayout);