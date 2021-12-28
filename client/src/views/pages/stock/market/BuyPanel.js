import React from 'react'
import { styled } from "@mui/material/styles";

import { TextField, Paper, Grid, Divider, Button } from '@mui/material';
const TextFieldLabel = styled(Paper)(({ theme }) => ({ fontSize: "18px", flexDirection: "column", display: "flex", justifyContent: "space-around" }));
function BuyPanel() {
    return (

        <div>
            <Grid container direction="row" xs={12} sx={{ "marginTop": "40px", "marginBottom": "30px" }}>
                <Grid item xs={3} style={{ fontWeight: "bold", display: "flex", justifyContent: "center" }}>
                    <TextFieldLabel>주문가격</TextFieldLabel>
                </Grid>
                <Grid item xs={9} style={{ fontWeight: "bold", display: "flex" }}>
                    <TextField id="orderprice" fullWidth />
                </Grid>
            </Grid>
            <Grid container direction="row" xs={12} sx={{ "marginTop": "40px", "marginBottom": "60px" }}>
                <Grid item xs={3} style={{ fontWeight: "bold", display: "flex", justifyContent: "center" }}>
                    <TextFieldLabel>주문수량</TextFieldLabel>
                </Grid>
                <Grid item xs={9} style={{ fontWeight: "bold", display: "flex" }}>
                    <TextField id="orderquantity" fullWidth />
                </Grid>
            </Grid>

            <Divider />
            <div style={{  display: "flex", justifyContent: "right" }}>
                <div style={{ "marginTop": "10px" ,"fontSize":"18px"}}>총 금액 : 10000미소</div>
            </div>
            <div style={{  display: "flex", justifyContent: "right" }}>
                <Button variant="outlined" style={{ "marginTop": "20px" }}>매수</Button>
            </div>
        </div>
    )
}

export default BuyPanel
