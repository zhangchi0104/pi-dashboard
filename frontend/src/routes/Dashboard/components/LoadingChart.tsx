import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    height: '200px',
  },
}));
const LoadingChart = () => {
  const classes = useStyles();
  return (
    <Paper>
      <div className={classes.chartContainer}></div>
    </Paper>
  );
};

export default LoadingChart;
