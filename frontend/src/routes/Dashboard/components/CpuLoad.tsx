import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CellText from './CellText';
import Grid from '@material-ui/core/Grid';
const CpuLoad = () => {
  return (
    <div>
      <Typography variant="h4" component="h2">
        CPU
      </Typography>
      <Paper>
        <Grid container>
          <Grid item sm={3}>
            <CellText title="700" subtitle={'mHz'} />
          </Grid>
          <Grid item sm={3}>
            <CellText title={'4'} subtitle="cores" />
          </Grid>
          <Grid item sm={3}>
            <CellText title={'51.4'} subtitle="°C" />
          </Grid>
          <Grid item sm={3}>
            <CellText title="51%" subtitle="Overall Loads" />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
export default CpuLoad;
