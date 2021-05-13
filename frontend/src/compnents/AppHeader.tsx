import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SettingsIcon from '@material-ui/icons/Settings';
import AppDrawer from './AppDrawer';
import { useTypedDispatch } from '../store';
import { toggleSidebar } from '@/store/AppbarSlice';

const useStyles = makeStyles((theme) => ({
  title: {
    paddingLeft: theme.spacing(2),
    flexGrow: 1,
  },
}));

const AppHeader = () => {
  const classes = useStyles();
  const dispatch = useTypedDispatch();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          aria-label="toogle-menu"
          onClick={() => dispatch(toggleSidebar())}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="h1" className={classes.title}>
          PiDashboard
        </Typography>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Toolbar>
      <AppDrawer />
    </AppBar>
  );
};

export default AppHeader;
