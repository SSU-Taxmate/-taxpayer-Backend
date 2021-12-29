import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Paper, Grid } from '@mui/material';
import { styled } from "@mui/material/styles";

import StockLine from '../components/StockLine';
import StockChart from '../components/StockChart';
import TabPanel from '../components/TabPanel';
import SellPanel from './SellPanel';
import BuyPanel from './BuyPanel';
function StockMarket() {

    const SecondHeaderTitle = styled(Paper)(({ theme }) => ({
        color: "#000000",
        fontWeight: "bold",
        fontSize: "18px",
    }));
    const SecondHeaderData = styled(Paper)(({ theme }) => ({
        color: "#2F80ED",
        fontSize: "18px",
    }));

    /*tab관련 */
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div>
            <Grid container direction="column" sx={{ justifyContent: "center" }}>
                <Box marginTop="40px"marginBottom="40px">
                    <StockChart />
                </Box>

                {/*표*/}
                <Grid container direction="row" style={{ padding: "10px", display: "flex", justifyContent: "space-around" }}>
                    <Grid item style={{ padding: '10px', fontWeight: "bold", display: "flex" }}>
                        <Grid item sx={{ paddingRight: "15px" }}>
                            <SecondHeaderTitle>전일가</SecondHeaderTitle>
                        </Grid>
                        <Grid item ><SecondHeaderData>11111111</SecondHeaderData></Grid>
                    </Grid>
                    <Grid item style={{ padding: "10px", fontWeight: "bold", display: "flex" }}>
                        <Grid item sx={{ paddingRight: "15px" }}>
                            <SecondHeaderTitle>전일비</SecondHeaderTitle>
                        </Grid>
                        <Grid item style={{ fontSize: "36px" }}><SecondHeaderData>15000000000</SecondHeaderData></Grid>
                    </Grid>
                </Grid>

                <Grid container direction="row" style={{ paddingBottom: "10px", display: "flex", justifyContent: "space-around" }}>
                    <Grid item style={{ padding: '10px', fontWeight: "bold", display: "flex" }}>
                        <Grid item sx={{ paddingRight: "15px" }}>
                            <SecondHeaderTitle>한달최고가</SecondHeaderTitle>
                        </Grid>
                        <Grid item ><SecondHeaderData>11111111</SecondHeaderData></Grid>
                    </Grid>
                    <Grid item style={{ padding: '10px', fontWeight: "bold", display: "flex" }}>
                        <Grid item sx={{ paddingRight: "15px" }}>
                            <SecondHeaderTitle>한달최저가</SecondHeaderTitle>
                        </Grid>
                        <Grid item style={{ fontSize: "36px" }}><SecondHeaderData>2222222222</SecondHeaderData></Grid>
                    </Grid>
                </Grid>


                {/* 매도 / 매수 */}
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                            <Tab label="매수" id={`buytab`} areaControls={`buytabpanel`} />
                            <Tab label="매도" id={`selltab`} areaControls={`selltabpanel`} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <BuyPanel />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SellPanel />
                    </TabPanel>
                </Box>
            </Grid>
        </div>
    )
}

export default StockMarket
