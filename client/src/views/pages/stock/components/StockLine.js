import React from 'react'
import { useTheme } from '@mui/material/styles';

import { Avatar, Grid, Typography, Chip, ButtonBase } from '@mui/material';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
function StockLine({ company }) {
    const theme = useTheme();
    const chipSX = {
        height: 40,
        padding: '0 20px',
        borderRadius: '29px',
        fontSize: '14px',
        fontWeight: 'bold'
    };


    return (
        <>
            <Grid item xs={4}  >
                <Typography variant="subtitle1" color="inherit" fontSize={24}>
                    {company.name}
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Grid container alignItems="center" >
                    <Grid item >
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

        </>
    )
}

export default StockLine
