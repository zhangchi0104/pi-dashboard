import { useEffect, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import {
  EChartsOption,
  init as initChart,
  getInstanceByDom as getChartByDom,
} from 'echarts';
import { useTypedDispatch, useTypedSelector, observeStore } from '@/store';
import { fetchChartData } from '@/store/dashboard';
const useStyles = makeStyles((theme) => ({
  chartContainer: {
    height: '200px',
    padding: theme.spacing(1),
  },
}));
const initChartOptions = (
  data: { cpu: (number | string)[][]; memory: (number | string)[][] } = {
    cpu: [],
    memory: [],
  }
) => {
  const res = {
    title: {
      text: 'Loads Chart',
    },
    grid: {
      bottom: '13%',
      top: '20%',
      left: 'center',
      width: '90%',
    },
    series: [
      {
        type: 'line',
        name: 'CPU',
        data: data.cpu.map((v) => ({ name: v[0], value: v })),
      },
      {
        type: 'line',
        name: 'Memory',
        data: data.memory.map((v) => ({ name: v[0], value: v })),
      },       
    ],
    xAxis: {
      type: 'time',
      splitLine: {
        show: false,
      },
      axisLabel: {
        formatter: '{hh}:{mm}:{ss}',
      },
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: { show: false },
    },
    tooltip: {
      trigger: 'axis',
    },
  };
  return res;
};
const useLoadChartState = () => {
  const data = useTypedSelector((state) => state.dashboard.chartsData);
  let interval: number | null = null;
  const dispatch = useTypedDispatch();
  useEffect(() => {
    const _initGraph = async () => {
      const chart = initChart(document.querySelector('#loadChart')!);
      const options = initChartOptions(data);
      chart.setOption(options);
    };
    const _monitorData = () => {
      interval = window.setInterval(async () => {
        await dispatch(fetchChartData(0));
      }, 3000);
    };
    const _dispose = () => {
      const chart = getChartByDom(document.querySelector('#loadChart')!);
      chart.dispose();
      clearInterval(interval!);
    };
    _initGraph().then(_monitorData);
    return _dispose;
  }, []);
  useEffect(() => {
    const options: EChartsOption = {
      series: [
        {
          data: data.cpu.map((v) => ({ name: v[0], value: v })),
        },
        {
          data: data.memory.map((v) => ({ name: v[0], value: v })),
        },
      ],
    };
    const chart = getChartByDom(document.querySelector('#loadChart')!);
    chart.setOption(options);
  }, [data]);
};

const LoadsChart = () => {
  useLoadChartState();
  const classes = useStyles();
  return (
    <Paper>
      <div className={classes.chartContainer} id="loadChart"></div>
    </Paper>
  );
};

export default LoadsChart;
