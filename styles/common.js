const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	pageTitleRed: {
		fontFamily: "'BebasNeue', 'sans-serif'",
		fontSize: "2.3em",
		color: theme.palette.primary.main,
		fontWeight: "normal",
		fontStyle: "normal",
		fontStretch: "normal",
		lineHeight: "normal",
		letterSpacing: "normal"
	},
	btnRaisedLightNormalRed: {
		backgroundColor: theme.palette.primary.main,
		fontFamily: '"Arial"',
		textTransform: 'capitalize',
		fontSize: '1em',
		color: '#FFFFFF',
		padding: '5px',
		boxShadow: '0 2px 2px 1px rgba(0, 0, 0, .2)',
		fontWeight: '600',
		borderRadius: '3px',
		'&:hover': {
			backgroundColor: theme.palette.primary.main
		}
	},
	inputField: {
		color: '#757575',
		fontFamily: "'Lato'",
		fontSize: '1.5em'
	},
	inputUnderline: {
		'&:after': {
			borderBottomColor: '#757575',
			borderBottomWidth:'1px'
		}
	},
	inputLabel: {
		'&$cssFocused': {
		  color: '#757575',
		},
	},
	inputLabelFocused: {

	},
	footerLatoTextNormal: {
		color: '#9e9e9e',
		fontSize: '.8em',
		fontFamily: "'Lato'",
		fontWeight: 'normal',
		fontStyle: 'normal',
		fontStretch: 'normal'
	},
	footerLatoTextBold: {
		fontWeight: '600'
	},
	btnContainer: {
		margin: '89px 40px 50px'
	},
	footerLink1: {
		color: theme.palette.primary.main
	},
	footerBgIconContainer: {
		position: 'relative',
		fontSize: '0px',
		lineHeight: '0px',
		height: '0px'
	},
	footerBgIconLeft: {
		position: 'absolute',
		left: '0px',
		top: '-132px',
		backgroundImage: "url(/static/imgs/frame-left.png)",
		backgroundPosition: 'right',
		backgroundRepeat: 'no-repeat',
		zIndex: -1,
		width: '35px',
		height: '89px'
	},
	footerBgIconRight: {
		position: 'absolute',
		right: '0px',
		top: '-196px',
		backgroundImage: "url(/static/imgs/frame-right.png)",
		backgroundPosition: 'left',
		backgroundRepeat: 'no-repeat',
		zIndex: -1,
		width: '55px',
		height: '85px'
	},
	socialIcon: {
		width: '40px',
		height: '40px'
	},
	topBarLogoContainer: {
		textAlign: 'center',
		width: '100%'
	},
	topBgIconContainer: {
		position: 'relative'
	},
	topBgIconRight: {
		position: 'absolute',
		width: '129px',
		height: '129px',
		top: '-59px',
		right: '14px',
		zIndex: -1
	},
	headerMarginSuppress: {
		marginTop: '148px',
		[theme.breakpoints.down('lg')]: {
			marginTop: '10%',
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: '20%',
		},
		[theme.breakpoints.down('md')]: {
			marginTop: '25%',
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: '40%',
		}
	}
})

export default styles;