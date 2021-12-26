import React from "react";
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Menu, MenuItem, Typography, Pagination } from '@mui/material';

import { gridSpacing } from '../../../store/constant';

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

import StockLine from "./StockLine";
import blueBox from "../../../assets/images/blue_box.svg";
function Stock() {
  const company = { 'name': 'coconut', "stock": 100 };
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <Grid container spacing={gridSpacing} sx={{ justifyContent: 'space-around' }} xs={12}>
    <Grid item xs={12}>
      <Grid container alignContent="center" justifyContent='flex-end'>
        <Grid item>
          <MoreHorizOutlinedIcon
            fontSize="small"
            sx={{
              color: theme.palette.primary[200],
              cursor: 'pointer'
            }}
            aria-controls="menu-popular-card"
            aria-haspopup="true"
            onClick={handleClick}
          />
          <Menu
            id="menu-popular-card"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            variant="selectedMenu"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <MenuItem onClick={handleClose}>주식 수정</MenuItem>
            <MenuItem onClick={handleClose}>주식 추가</MenuItem>
          </Menu>
        </Grid>

      </Grid>
    </Grid>
    {/*  홍길동님의 주식 */}
    <Grid item style={{ display: 'flex', paddingBlockStart: '50px', fontSize: '36px' }}>
      <div style={{ display: 'flex', fontWeight: "bold", marginRight: '50px' }} >
        <div style={{ textAlign: 'right', width: '130px', backgroundSize: '120px 30px', backgroundRepeat: 'no-repeat', backgroundPosition: 'left 30%', backgroundImage: `url(${blueBox})` }}>
          홍길동
        </div>
        님의 주식
      </div>
      <div style={{ display: 'flex', fontWeight: "bold" }}>
        <Grid item sx={{ pr: '15px', fontSize: '14px' }}>평가금액</Grid>
        <Grid item >1000000000</Grid>
      </div>
    </Grid>
      <Divider sx={{ padding:'20px',display: 'flex', justifyContent: 'center',pb: 1.5, width: '900px' }} />
    {/* 주식 목록 */}
    <Grid item xs={12}>
      <StockLine company={company} />
      <Divider sx={{ my: 1.5 }} />
      <StockLine company={company} />
      <Divider sx={{ my: 1.5 }} />
      <StockLine company={company} />
      <Grid>
        <Pagination count={5} sx={{
          "& > *": {
            marginTop: theme.spacing(5),
            justifyContent: "center",
            display: 'flex'
          }
        }} />
      </Grid>
    </Grid>
  </Grid>;
}

export default Stock;
