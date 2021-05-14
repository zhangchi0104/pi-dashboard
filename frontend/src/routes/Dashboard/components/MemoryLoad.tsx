import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CellText from './CellText';
const Memory = () => {
  return (
    <div>
      <Typography variant="h4">Memory</Typography>
      <Paper>
        <Grid container>
          <Grid item sm={6}>
            <CellText title="52.24%" subtitle="Used" />
          </Grid>
          <Grid item sm={6}>
            <CellText title="8192" subtitle="Mb" />
          </Grid>
          <Grid item sm={6}>
            <CellText title="8192" subtitle="Mb" />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Memory;
