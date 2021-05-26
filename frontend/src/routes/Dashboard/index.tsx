import { makeStyles } from '@material-ui/core';
import CpuLoad from './components/CpuLoad';
import Summary from './components/Summary';
import MemoryLoad from './components/MemoryLoad';
import Grid from '@material-ui/core/Grid';
import LoadsChart from './components/LoadsChart';
const useStyles = makeStyles((theme) => ({
  vsplit: {
    display: 'flex',
    flexDirection: 'row',
  },
  cpuLoad: {
    flexGrow: 5,
    margin: theme.spacing(0, 1),
  },
  memory: {
    flexGrow: 3,
    margin: theme.spacing(0, 1),
  },
}));
const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Summary />
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CpuLoad />
          </Grid>
          <Grid item xs={12} md={6}>
            <MemoryLoad />
          </Grid>
          <Grid item xs={12}>
            <LoadsChart />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Dashboard;
