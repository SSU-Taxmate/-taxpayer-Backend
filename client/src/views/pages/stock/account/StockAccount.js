import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, CircularProgress, Divider, Grid, Typography } from '@mui/material';

// project imports
import StockChart from '../components/StockChart';

import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';


const StockAccount = ({ isLoading }) => {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container alignContent="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h4">Stocks</Typography>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ pt: '16px !important' }}>
                            <StockChart />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                Bajaj Finery
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $1839.00
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: '5px',
                                                            backgroundColor: theme.palette.success.light,
                                                            color: theme.palette.success.dark,
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
                                <Grid item>
                                    <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                                        10% Profit
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 1.5 }} />
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                TTML
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $100.00
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: '5px',
                                                            backgroundColor: theme.palette.orange.light,
                                                            color: theme.palette.orange.dark,
                                                            marginLeft: 1.875
                                                        }}
                                                    >
                                                        <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2" sx={{ color: theme.palette.orange.dark }}>
                                        10% loss
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 1.5 }} />
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                Reliance
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $200.00
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: '5px',
                                                            backgroundColor: theme.palette.success.light,
                                                            color: theme.palette.success.dark,
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
                                <Grid item>
                                    <Typography variant="subtitle2" sx={{ color: theme.palette.success.dark }}>
                                        10% Profit
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 1.5 }} />
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                TTML
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $189.00
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: '5px',
                                                            backgroundColor: theme.palette.orange.light,
                                                            color: theme.palette.orange.dark,
                                                            ml: 2
                                                        }}
                                                    >
                                                        <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2" sx={{ color: theme.palette.orange.dark }}>
                                        10% loss
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 1.5 }} />
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                Stolon
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $189.00
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: '5px',
                                                            backgroundColor: theme.palette.orange.light,
                                                            color: theme.palette.orange.dark,
                                                            ml: 2
                                                        }}
                                                    >
                                                        <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2" sx={{ color: theme.palette.orange.dark }}>
                                        10% loss
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
};

StockAccount.propTypes = {
    isLoading: PropTypes.bool
};

export default StockAccount;
