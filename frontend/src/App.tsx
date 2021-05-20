import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppHeader from './compnents/AppHeader';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Routes from './routes';
import store from './store';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));
function AppContent() {
  const classes = useStyles();
  return (
    <div className="App">
      <CssBaseline />
      <AppHeader />
      <Container className={classes.container}>
        <Routes />
      </Container>
    </div>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#90caf9',
      light: '#a6d4fa',
      dark: '#648dae',
    },
    secondary: {
      light: '#f6a5c0',
      main: '#f48fb1',
      dark: '#aa647b',
    },
  },
});

const App = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </StoreProvider>
  );
};
export default App;
