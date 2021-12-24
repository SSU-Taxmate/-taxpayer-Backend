import React from 'react'
import {  Grid, Divider } from '@mui/material';

function StockInfo() {
    return (
        <>
            <Grid container alignItems="center" justifyContent="space-around">
                <Grid item sx={{ p: '8px !important', fontSize: 20, fontWeight: 'bold' }}>
                    전일가
                </Grid>
                <Grid item sx={{ p: '8px !important', fontSize: 20, fontWeight: 'bold' }}>
                    100
                </Grid>
            </Grid>
            <Divider sx={{ my: 1}} />


            <Grid item sx={{ p: '8px !important', fontSize: 18 }}>
                코코넛이 제철을 맞아서 매우 매우 달다고 함 o  o o o
            </Grid>


            <Divider sx={{ my: 1 }} />

            <Grid item sx={{ p: '8px !important', fontSize: 18 }}>
                코코넛이 제철을 맞아서 매우 매우 달다고 함2 o  o o o
            </Grid>
        </>
    )
}

export default StockInfo
