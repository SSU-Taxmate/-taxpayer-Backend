import React from "react";

// material-ui
import { Grid,  ButtonBase, Chip, Collapse, Divider } from '@mui/material';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import StockChart from "./components/StockChart";
import StockInfo from './StockInfo';
import StockLine from './components/StockLine';
import { useTheme } from '@mui/material/styles';

function StockListItem(props) {
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
            <Grid container direction="column">
                <Grid container direction="row">
                    <Grid container xs={10} onClick={handleClick}>
                        <StockLine company={company}></StockLine>
                    </Grid>
                    <Grid container xs={2}>
                        <ButtonBase href={`/taxmate/stock-market`} >
                            <Chip label="거래" bgcolor="grey.300" sx={chipTradeSX} />
                        </ButtonBase>
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

                        <Divider orientation="vertical" flexItem />

                        <Grid item xs={5} sx={{ pt: '16px !important' }}>
                            <StockInfo />
                        </Grid>
                    </Grid>
                </Collapse>
            </Grid>

        </>
    )
}

export default StockListItem
