import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Paper, Grid } from '@mui/material';
import { styled } from "@mui/material/styles";

import StockLine from '../components/StockLine';
import StockChart from '../components/StockChart';
function StockMarket() {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));
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
            stockmarket
            <Grid container xs={12} sx={{ justifyContent: "center" }}>
                <StockLine company={{ "name": "코코넛2" }} />
                <StockChart />

                {/*표*/}
                <Grid container spacing={2}>
                    <Grid item xs={1} md={1} />
                    <Grid item xs={2} md={2}>
                        <Item><SecondHeaderTitle>전일가</SecondHeaderTitle></Item>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Item><SecondHeaderData>100</SecondHeaderData></Item>
                    </Grid>
                    <Grid item xs={2} md={2}>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Item><SecondHeaderTitle>전일비</SecondHeaderTitle></Item>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Item><SecondHeaderData>100%</SecondHeaderData></Item>
                    </Grid>
                    <Grid item xs={1} md={1} />
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={1} md={1} />
                    <Grid item xs={2} md={2}>
                        <Item><SecondHeaderTitle>한달최고가</SecondHeaderTitle></Item>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Item><SecondHeaderData>200</SecondHeaderData></Item>
                    </Grid>
                    <Grid item xs={2} md={2}>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Item><SecondHeaderTitle>한달최저가</SecondHeaderTitle></Item>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Item><SecondHeaderData>200</SecondHeaderData></Item>
                    </Grid>
                    <Grid item xs={1} md={1} />
                </Grid>
                {/* 매도 / 매수 */}

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                            <Tab label="매수" id={`buytab`} areaControls={`buytabpanel`}/>
                            <Tab label="매도"  id={`selltab`} areaControls={`selltabpanel`}/>
                        </Tabs>
                    </Box>
                    <div value={value} index={0}>
                        매수
                    </div>
                    <div value={value} index={1}>
                        매도
                    </div>
                </Box>
            </Grid>
        </div>
    )
}

export default StockMarket
