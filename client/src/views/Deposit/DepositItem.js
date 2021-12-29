// material-ui
import { Grid } from '@mui/material';
import "../../css/custom.css";
import Typography from '@mui/material/Typography';



// ==============================|| SAMPLE PAGE ||============================== //

const DepositItem= (props) => (
  
      <Grid container spacing={2} className='account-record-item'>
         
            <Grid item xs={6}>
            <Typography variant="h5" component="div" >{ props.name}</Typography> 
            </Grid>
            <Grid item xs={2}>
            <Typography variant="h5" component="div" align='end'>{ props.rate}</Typography> 
            </Grid>
            <Grid item xs={4}>
            <Typography variant="h5" component="div" align='end'>{ props.min}</Typography> 
            </Grid>

      </Grid>
);

export default DepositItem;
