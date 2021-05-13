import { useTypedDispatch, useTypedSelector } from '../store';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { toggleSidebar } from '../store/appBar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SettingsIcon from '@material-ui/icons/Settings';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: '250px',
    },
    width: '100vw',
  },
  listItem: {
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));
const AppDrawer = () => {
  const drawerVisible = useTypedSelector(
    (state) => state.appbar.sidebarVisibility
  );
  const dispatch = useTypedDispatch();
  const classes = useStyles();
  const history = useHistory();
  const redirect = (path: string) => {
    history.push(path);
    dispatch(toggleSidebar());
  };
  return (
    <Drawer
      anchor="left"
      open={drawerVisible}
      onClose={() => dispatch(toggleSidebar())}
    >
      <List className={classes.drawer}>
        <ListItem
          button
          className={classes.listItem}
          onClick={() => redirect('/dashboard')}
        >
          <ListItemIcon aria-label="go-to-home">
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
        <Divider className={classes.divider} />
        <ListItem button onClick={() => redirect('/settings')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </ListItem>
        <ListItem button onClick={() => dispatch(toggleSidebar())}>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <ListItemText>Close</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AppDrawer;
