import React from "react";

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Grid, Typography, Chip, Collapse,  } from '@mui/material';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import StockChart from "./StockChart";
import StockInfo from './StockInfo';

function StockLine() {
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
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <Grid container direction="column" onClick={handleClick}>
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item xs={8}>
                            <Typography variant="subtitle1" color="inherit" fontSize={20}>
                                CoConut
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Chip label="trade" bgcolor="grey.300" sx={chipTradeSX} />
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit" fontSize={24}>
                                        $200.00
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
                </Grid>
            </Grid>
            <Grid container direction="column">
                <Collapse in={open}>
                    <Grid container direction='row'>
                        <Grid item xs={6} sx={{ pt: '16px !important' }}>
                            <StockChart />
                        </Grid>
                        <Grid item xs={0.5} sx={{ pt: '16px !important' }} />
                        <Grid item xs={5} sx={{ pt: '16px !important' }}>
                           <StockInfo/>
                        </Grid>
                        <Grid item xs={0.5} sx={{ pt: '16px !important' }} />

                    </Grid>
                </Collapse>
            </Grid>

        </>
    )
}

export default StockLine
