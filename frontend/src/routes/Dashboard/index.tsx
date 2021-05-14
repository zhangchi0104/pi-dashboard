import { makeStyles } from '@material-ui/core';
import CpuLoad from './components/CpuLoad';
import Summary from './components/Summary';
import MemoryLoad from './components/MemoryLoad';
const useStyles = makeStyles((theme) => ({
  vsplit: {
    display: 'flex',
    flexDirection: 'row',
  },
  cpuLoad: {
    flexGrow: 1,
    margin: theme.spacing(0, 1),
  },
  memory: {
    flexGrow: 1,
    margin: theme.spacing(0, 1),
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.vsplit}>
      <div>
        <Summary />
      </div>
      <div className={classes.cpuLoad}>
        <CpuLoad />
      </div>
      <div className={classes.memory}>
        <MemoryLoad />
      </div>
    </div>
  );
};
export default Dashboard;
