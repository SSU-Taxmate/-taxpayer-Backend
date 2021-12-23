import React from "react";

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Grid, Typography, Chip, Collapse,Divider } from '@mui/material';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import StockChart from "./StockChart";
import StockInfo from './StockInfo';

function StockLine(props) {
    const company = props.company;
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

export default StockLine
