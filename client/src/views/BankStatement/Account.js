// material-ui
import { Grid } from '@mui/material';
import "../../css/custom.css";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



// ==============================|| SAMPLE PAGE ||============================== //

const Account = (props) => (
    <Box component="div" sx={{ p: 6, borderRadius: 3, p:5}} className="account">
         <Typography variant="h4" component="div" align="center" sx={{mb:3}}>
    입출금 계좌
      </Typography>   
    <Typography variant="h1" component="div" align="center">
    {props.amount}
      </Typography>   
  </Box>
     
);

export default Account;
