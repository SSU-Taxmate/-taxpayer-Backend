import React from "react";
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

import { gridSpacing } from '../../../store/constant';

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

import StockLine from "./StockLine";

function Stock() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <Grid container spacing={gridSpacing}>
    <Grid item xs={12}>
      <Grid container alignContent="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4">Stocks</Typography>
        </Grid>
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
    <Grid item xs={12}>
      <Grid container direction='row'>
        <Grid item xs={6} sx={{ p: '8px !important' }}>
          전일가
        </Grid>
        <Grid item xs={6} sx={{ p: '8px !important' }}>
          100
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <StockLine />
      <Divider sx={{ my: 1.5 }} />
      <StockLine />
      <Divider sx={{ my: 1.5 }} />
      <StockLine />
    </Grid>
  </Grid>;
}

export default Stock;
