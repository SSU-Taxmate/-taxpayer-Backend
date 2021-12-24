import React from 'react'
import { useTheme } from '@mui/material/styles';

import { Avatar, Grid, Typography, Chip, Collapse,Divider } from '@mui/material';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
function StockLine({company}) {
    const theme = useTheme();
    const chipSX = {
        height: 40,
        padding: '0 20px',
        borderRadius: '29px',
        fontSize: '14px',
        fontWeight: 'bold'
    };

    const chipTradeSX = {
        ...chipSX,
        color: "#212121",
        backgroundColor: "#e0e0e0",
    };
    return (
        <>
           <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={8}>
                        <Typography variant="subtitle1" color="inherit" fontSize={20}>
                            {company.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Chip label="trade" bgcolor="grey.300" sx={chipTradeSX} />
                    </Grid>
                    <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit" fontSize={24}>
                                    {company.stock}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: '5px',
                                        backgroundColor: theme.palette.error.light,
                                        color: theme.palette.error.dark,
                                        ml: 2
                                    }}
                                >
                                    <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                </Avatar>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>  
        </>
    )
}

export default StockLine
