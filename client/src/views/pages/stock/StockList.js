import React from "react";

// material-ui
import { Avatar, Grid, Typography, Chip, Collapse,Divider } from '@mui/material';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import StockChart from "./components/StockChart";
import StockInfo from './StockInfo';
import StockLine from './components/StockLine';
function StockList(props) {
 
 
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <Grid container direction="column" onClick={handleClick}>
                <StockLine company={props.company}/>
            </Grid>
            <Grid container direction="column">
                {/* 접히는 부분 */}
                <Collapse in={open}>
                    <Grid container direction='row' alignItems="center" justifyContent="space-between">
                        <Grid item xs={6} sx={{ pt: '16px !important' }}>
                            <StockChart />
                        </Grid>
                        
                        <Divider orientation="vertical" flexItem/>

                        <Grid item xs={5} sx={{ pt: '16px !important' }}>
                            <StockInfo />
                        </Grid>
                    </Grid>
                </Collapse>
            </Grid>

        </>
    )
}

export default StockList
