import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from '../../../dashboard/Default/chart-data/bajaj-area-chart';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
//./chart-data/bajaj-area-chart
// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const StockChart = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { navType } = customization;

    const primaryColor = theme.palette.primary[800];

    useEffect(() => {
        const newSupportChart = {
            ...chartData.options,
            colors: [primaryColor],
            tooltip: {
                theme: 'light'
            }
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    }, [navType, primaryColor]);

    return (
        <Card >
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item xs={9}>
                            <Typography variant="h3" sx={{  fontWeight:"bold" }} >
                                코코넛
                            </Typography>
                        </Grid>
                    <Grid item xs={1}>

                    <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] ,pt:1}} align='end'>
                    <ArrowDropUpIcon sx={{ color: 'error.main'}}  />
                    </Typography>
                </Grid>
                        <Grid item xs={2} align='end'>
                            <Typography variant="h4" sx={{ color: theme.palette.grey[800] }} align='center'>
                                $1839.00
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
               
            <Chart {...chartData} />
        </Card>
    );
};

export default StockChart;
