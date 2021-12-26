// material-ui
import { Grid } from '@mui/material';
import "../../css/custom.css";


// project imports
import MainCard from '../../ui-component/cards/MainCard';
import ColumChart from './ColumChart';
import DonutChart from './DonutChart'
// ==============================|| SAMPLE PAGE ||============================== //

const Bank = () => (
  
        <Grid  container spacing={4}>

        <Grid item xs={6} >
            <div className="custom-title"><span className="half_highlight">&nbsp;&nbsp;&nbsp;&nbsp;홍길동</span>님의 자산현황</div>
        </Grid>
        <Grid item xs={6}>
            <div className="custom-title">100,000</div>
        </Grid>

        <Grid item md={12}>
          <hr/>
        </Grid>

        <Grid item xs={2} >
        </Grid>
        <Grid item xs={4}>
            <div className="custom-title-item">입출금 계좌</div>
        </Grid>
        <Grid item xs={4} >
            <div className="custom-title-item">100,000</div>
            
        </Grid>
        <Grid item xs={2} >
        </Grid>



        <Grid item xs={2}>
        </Grid>
        <Grid item xs={4}>
            <div className="custom-title-item">예금 계좌</div>
        </Grid>
        <Grid item xs={4} >
            <div className="custom-title-item">100,000</div>
            
        </Grid>
        <Grid item xs={2} >
        </Grid>
    
        

        <Grid item xs={6} >
            <div className="custom-title">지출 · 소비</div>
        </Grid>
        <Grid item xs={6} >
    
           
        </Grid>

        <Grid item md={12}>
          <hr/>
        </Grid>

        <Grid item xs={0} md={2}>
        </Grid>
        <Grid item xs={6} md={4}>
            <div className="custom-title-item">11월 소비</div>
        </Grid>
        <Grid item xs={6} md={4} >
            <div className="custom-title-item">100,000</div>
            
        </Grid>
        <Grid item xs={0} md={2}>
        </Grid>



        <Grid item xs={0} md={2}>
        </Grid>
        <Grid item xs={6} md={4}>
            <div className="custom-title-item">WEEK 지출 트렌드</div>
        </Grid>
        <Grid item xs={6} md={4}>
            <div className="custom-title-item">평균 100,000</div>
            
        </Grid>
        <Grid item xs={0} md={2}>
        </Grid>

        <Grid item xs={0} md={4}>
        </Grid>
        <Grid item xs={12} md={4}>
            <DonutChart/>
        </Grid>
        <Grid item xs={0} md={4}>
        </Grid>

        <Grid item xs={0} md={3}>
        </Grid>
        <Grid item xs={12} md={6}>
            <ColumChart/>
        </Grid>
        <Grid item xs={0} md={3}>
        </Grid>
        </Grid>
    
);

export default Bank;
