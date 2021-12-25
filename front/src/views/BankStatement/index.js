// material-ui
import { Grid } from '@mui/material';
import "../../css/custom.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Typography from '@mui/material/Typography';


// ==============================|| SAMPLE PAGE ||============================== //

const BankStatement = () => (
<MainCard>
<Card>
      <CardContent>
      <Typography variant="h1" component="div" align="center">
          100,000,000
        </Typography>
      </CardContent>
     
    </Card>


</MainCard>
);

export default BankStatement;
