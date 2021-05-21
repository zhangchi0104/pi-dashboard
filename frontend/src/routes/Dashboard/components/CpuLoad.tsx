import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CellText from './CellText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(1, 2),
    background: theme.palette.secondary.light,
  },
  form: {
    padding: theme.spacing(1),
  },
}));

const useCpuLoadState = () => {};
const CpuLoad = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper>
        <Typography variant="h5" component="h2" className={classes.title}>
          CPU
        </Typography>
        <Divider />
        <Grid container spacing={2} className={classes.form}>
          <Grid item sm={6}>
            <CellText title="700" subtitle={'mHz'} />
          </Grid>
          <Grid item sm={6}>
            <CellText title={'4'} subtitle="cores" />
          </Grid>
          <Grid item sm={6}>
            <CellText title={'51.4'} subtitle="°C" />
          </Grid>
          <Grid item sm={6}>
            <CellText title="51%" subtitle="Overall Loads" />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
export default CpuLoad;
