import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  summaryContainer: {
    padding: theme.spacing(0, 1),
  },
  summaryContent: {
    padding: theme.spacing(2, 3),
  },
}));
const Summary = () => {
  const classes = useStyles();
  return (
    <div className={classes.summaryContainer}>
      <Typography variant="h4" component="h2" align="center">
        Summary
      </Typography>
      <Paper>
        <div className={classes.summaryContent}>
          <Typography variant="body1" align="center" color="textSecondary">
            IP Address
          </Typography>
          <Typography variant="h5" align="center">
            192.168.50.26
          </Typography>
        </div>
        <Divider />
        <div className={classes.summaryContent}>
          <Typography variant="body1" align="center" color="textSecondary">
            Up Time
          </Typography>
          <Typography variant="h5" align="center">
            10 days
          </Typography>
        </div>
        <Divider />
        <div className={classes.summaryContent}>
          <Typography variant="body1" align="center" color="textSecondary">
            OS
          </Typography>
          <Typography variant="h5" align="center">
            Ubuntu Server 20.10
          </Typography>
        </div>
        <Divider />
        <div className={classes.summaryContent}>
          <Typography variant="body1" align="center" color="textSecondary">
            Current User
          </Typography>
          <Typography variant="h5" align="center">
            ubuntu
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

export default Summary;
