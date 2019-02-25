import { SheetsRegistry } from 'jss'
import {
	createMuiTheme,
	createGenerateClassName
} from '@material-ui/core/styles'

const theme = createMuiTheme({
	typography: {
		useNextVariants: true
	},
	palette: {
		background: {
			default: '#fff'
		},
		primary: {
			// light: will be calculated from palette.primary.main,
			main: '#f44336',
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			light: '#0066ff',
			main: '#f44336',
			// dark: will be calculated from palette.secondary.main,
			contrastText: '#ffcc00',
		},
		// error: will use the default color
		action: {
			hover: '#f44336'
		}
	},
})

const createPageContext = () => {
	return {
		theme,
		sheetsManager: new Map(),
		sheetsRegistry: new SheetsRegistry(),
		generateClassName: createGenerateClassName()
	}
}

let pageContext

const getPageContext = () => {
	if (!process.browser) {
		return createPageContext()
	}

	if (!pageContext) {
		pageContext = createPageContext()
	}

	return pageContext
}

export default getPageContext
