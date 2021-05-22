import { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import { init as initChart } from 'echarts';
const useStyles = makeStyles((theme) => ({
  chartContainer: {
    height: '200px',
  },
}));

const useLoadChartState = () => {
  useEffect(() => {
    const chart = initChart(document.querySelector('#loadChart')!);
  });
};
const LoadingChart = () => {
  const classes = useStyles();
  return (
    <Paper>
      <div className={classes.chartContainer} id="loadChart"></div>
    </Paper>
  );
};

export default LoadingChart;
