import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CellText from './CellText';
import { makeStyles } from '@material-ui/core';
import { useTypedDispatch, useTypedSelector } from '@/store';
import { useEffect } from 'react';
import { fetchMemoryInfo, fetchMemoryLoad } from '@/store/dashboard';
const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(1, 2),
    background: theme.palette.secondary.light,
  },
  form: {
    padding: theme.spacing(1),
  },
}));

const useMemoryState = () => {
  const memInfo = useTypedSelector((state) => state.dashboard.memInfo);
  const dispatch = useTypedDispatch();
  let interval: number | null = null;
  useEffect(() => {
    const _fetchMemInfo = async () => {
      await dispatch(fetchMemoryInfo());
    };
    const _watchMemUsage = () => {
      interval = window.setInterval(async () => {
        await dispatch(fetchMemoryLoad());
      }, 3000);
    };
    const unsubscribe = () => {
      interval && clearInterval(interval);
    };
    _fetchMemInfo().then(_watchMemUsage);
    return unsubscribe;
  }, []);
  return memInfo;
};
const Memory = () => {
  const classes = useStyles();
  const memInfo = useMemoryState();
  return (
    <div>
      <Paper>
        <Typography variant="h5" component="h2" className={classes.title}>
          Memory
        </Typography>
        <Grid container spacing={2} className={classes.form}>
          <Grid item sm={6}>
            <CellText
              title={
                memInfo?.usedPercent
                  ? memInfo.usedPercent.toFixed(2) + '%'
                  : 'Loading'
              }
              subtitle="Used"
            />
          </Grid>
          <Grid item sm={6}>
            <CellText
              title={
                memInfo?.total ? memInfo.total.toFixed(0) + ' Mb' : 'loading'
              }
              subtitle="Total"
            />
          </Grid>
          <Grid item sm={6}>
            <CellText
              title={
                memInfo?.bufferCached
                  ? memInfo.bufferCached.toFixed(0) + ' Mb'
                  : 'loading'
              }
              subtitle="Buffered + Cache"
            />
          </Grid>
          <Grid item sm={6}>
            <CellText title="0%" subtitle={`Swap (total: 0 Mb)`} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Memory;
