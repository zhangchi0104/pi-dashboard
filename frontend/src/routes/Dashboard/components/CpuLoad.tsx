import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CellText from './CellText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core';
import { useTypedDispatch, useTypedSelector } from '@/store';
import { useEffect } from 'react';
import { fetchCpuInfo, fetchCpuLoad } from '@/store/dashboard';
const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(1, 2),
    background: theme.palette.secondary.light,
  },
  form: {
    padding: theme.spacing(1),
  },
}));

const useCpuLoadState = () => {
  const cpuInfo = useTypedSelector((state) => state.dashboard.cpuInfo);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const _fetchCpuInfo = async () => {
      await dispatch(fetchCpuInfo());
    };
    const _monitorCpuInfo = () => {
      interval = setInterval(async () => {
        await dispatch(fetchCpuLoad());
      }, 3000);
    };
    _fetchCpuInfo().then(_monitorCpuInfo);
    const unsubscribe = () => {
      console.log('clearing', interval);
      interval && clearInterval(interval);
    };
    return unsubscribe;
  }, []);

  return cpuInfo;
};
const CpuLoad = () => {
  const classes = useStyles();
  const cpuInfo = useCpuLoadState();
  return (
    <div>
      <Paper>
        <Typography variant="h5" component="h2" className={classes.title}>
          CPU
        </Typography>
        <Divider />
        <Grid container spacing={2} className={classes.form}>
          <Grid item sm={6}>
            <CellText
              title={cpuInfo?.clockSpeed.toFixed(2) || 'loading'}
              subtitle={'GHz'}
            />
          </Grid>
          <Grid item sm={6}>
            <CellText
              title={cpuInfo?.cores.toFixed(0) || 'loading'}
              subtitle="cores"
            />
          </Grid>
          <Grid item sm={6}>
            <CellText
              title={cpuInfo?.temperature.toFixed(2) || 'loading'}
              subtitle="°C"
            />
          </Grid>
          <Grid item sm={6}>
            <CellText
              title={cpuInfo?.load ? cpuInfo.load.toFixed(2) + '%' : 'loading'}
              subtitle="Overall Loads"
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
export default CpuLoad;
