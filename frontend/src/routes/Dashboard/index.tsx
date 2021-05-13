import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Summary from './components/Summary';
const useStyles = makeStyles((theme) => ({
  vsplit: {
    display: 'flex',
    flexDirection: 'row',
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.vsplit}>
      <Summary />
      <div>
        <Typography>Leading</Typography>
      </div>
    </div>
  );
};
export default Dashboard;
