import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CellText from './CellText';
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
const Memory = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper>
        <Typography variant="h5" component="h2" className={classes.title}>
          Memory
        </Typography>
        <Grid container spacing={2} className={classes.form}>
          <Grid item sm={6}>
            <CellText title="52.24%" subtitle="Used" />
          </Grid>
          <Grid item sm={6}>
            <CellText title="8192 Mb" subtitle="Total" />
          </Grid>
          <Grid item sm={6}>
            <CellText title="5071 Mb" subtitle="Buffered + Cache" />
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
