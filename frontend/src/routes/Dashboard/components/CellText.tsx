import Typography from '@material-ui/core/Typography';

interface CellTextProps {
  title: string;
  subtitle: string;
}

const CellText = (props: CellTextProps) => {
  return (
    <>
      <Typography variant="h5" align="center" component="p">
        {props.title}
      </Typography>
      <Typography
        variant="body2"
        align="center"
        color="textSecondary"
        component="p"
      >
        {props.subtitle}
      </Typography>
    </>
  );
};

export default CellText;
