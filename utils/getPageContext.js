


import { SheetsRegistry } from 'react-jss';
import {
  createMuiTheme,
  createGenerateClassName
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: '"Lato", "Roboto", "Helvetica", "Arial", sans-serif'
  },
  button: {
    fontFamily: '"Lato", "Roboto", "Helvetica", "Arial", sans-serif'
  },
  palette: {
    background: {
      default: '#fff'
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#232947'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#fff',
      main: '#F9F9F9',
      dark: '#f4f4f4',
      contrastText: '#fff',

    },
    // error: will use the default color
    action: {
      hover: '#f44336'
    }
  }
});

const createPageContext = () => {
  return {
    theme,
    sheetsManager: new Map(),
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName()
  };
};

let pageContext;

const getPageContext = () => {
  if (!process.browser) {
    return createPageContext();
  }

  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
};

export default getPageContext;
