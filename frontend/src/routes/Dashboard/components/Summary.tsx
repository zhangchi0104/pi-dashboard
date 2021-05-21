import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core';
import { useTypedDispatch, useTypedSelector } from '@/store';
import { fetchMetaInfo } from '@/store/dashboard';
import { getDurationStr } from '@/utils';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  summaryContainer: {
    padding: theme.spacing(0, 1),
  },
  summaryContent: {
    padding: theme.spacing(2, 3),
  },
  title: {
    padding: theme.spacing(1, 2),
    background: theme.palette.secondary.light,
  },
}));

const useSummaryState = () => {
  const metaInfo = useTypedSelector((state) => state.dashboard.metaInfo);
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(fetchMetaInfo());
  }, []);
  return metaInfo;
};
const Summary = () => {
  const metaInfo = useSummaryState();
  const classes = useStyles();
  return (
    <div className={classes.summaryContainer}>
      <Paper>
        <Typography
          variant="h5"
          component="h2"
          align="center"
          className={classes.title}
        >
          Summary
        </Typography>
        <Divider />
        <div className={classes.summaryContent}>
          <Typography variant="body1" align="center" color="textSecondary">
            IP Address
          </Typography>
          <Typography variant="h6" align="center">
            {metaInfo?.ipAddr || 'Loading'}
          </Typography>
        </div>
        <Divider />
        <div className={classes.summaryContent}>
          <Typography variant="body1" align="center" color="textSecondary">
            Up Time
          </Typography>
          <Typography variant="h6" align="center">
            {metaInfo?.uptime ? getDurationStr(metaInfo.uptime) : 'Loading'}
          </Typography>
        </div>
        <Divider />
        <div className={classes.summaryContent}>
          <Typography variant="body1" align="center" color="textSecondary">
            Disk Type
          </Typography>
          <Typography variant="h6" align="center">
            {metaInfo?.diskType || 'Loading'}
          </Typography>
        </div>
        <Divider />
        <div className={classes.summaryContent}>
          <Typography variant="body1" align="center" color="textSecondary">
            Disk Used
          </Typography>
          <Typography variant="h6" align="center">
            {metaInfo?.diskUsage ? metaInfo.diskUsage + '%' : 'Loading'}
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

export default Summary;
