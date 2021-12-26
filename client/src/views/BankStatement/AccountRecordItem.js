// material-ui
import { Grid } from '@mui/material';
import "../../css/custom.css";
import Typography from '@mui/material/Typography';



// ==============================|| SAMPLE PAGE ||============================== //

const AccountRecordItem = (props) => (
  
      <Grid container spacing={2} className='account-record-item'>
            <Grid item xs={2}>
            <Typography variant="h5" component="div">{ props.date}</Typography> 
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" component="div" >{ props.memo}</Typography> 
            </Grid>
            <Grid item xs={4}>
                  {
                        props.amount > 0 ? <Typography variant="h5" component="div" align="end" color="primary">{props.amount}</Typography> 
                        : <Typography variant="h5" component="div" align="end" >{ props.amount}</Typography> 
                  }
            </Grid>

      </Grid>
);

export default AccountRecordItem;
