import React from "react";
import { useState } from "react";
import '../../../css/custom.css'


// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Divider,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Pagination,
  Button,
  Box,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import { gridSpacing } from "../../../store/constant";
import { styled } from "@mui/material/styles";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

import StockListItem from "./StockListItem";
import blueBox from "../../../assets/images/blue_box.svg";
function Stock() {
  const company = { name: "coconut", stock: 100 };
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };


  const SecondHeaderTitle = styled(Paper)(({ theme }) => ({
    color: "#000000",
    fontWeight: "bold",
    fontSize: "18px",
  }));
  const SecondHeaderData = styled(Paper)(({ theme }) => ({
    color: "#2F80ED",
    fontSize: "18px",
  }));
  return (
    <Grid
      container
      spacing={gridSpacing}
      sx={{ justifyContent: "space-between" }}
      xs={12}
    >
      
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <MoreHorizOutlinedIcon
              fontSize="small"
              sx={{
                color: theme.palette.primary[200],
                cursor: "pointer",
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
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleClose}>주식 수정</MenuItem>
              <MenuItem onClick={handleClose}>주식 추가</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Grid>

      {/*  홍길동님의 주식 */}

      <Grid  container spacing={4} sx={{marginTop:3}}>

<Grid item xs={6} >
    <div className="custom-title"><span className="half_highlight">&nbsp;&nbsp;&nbsp;&nbsp;홍길동</span>님의 주식현황</div>
</Grid>
<Grid item xs={2}>
    <Typography variant='subtitle2' sx={{marginTop: '10px',marginBottom: '10px'}}  align='end'>평가금액</Typography>
</Grid>
<Grid item xs={4}>
  <div className="custom-title">100,000</div>
</Grid>
 {/*자세히보러가기*/}
 <Grid
        item
        style={{ display: "flex", justifyContent: 'flex-end', width: "96%" }}
      >
        <Link to={`/taxmate/students/${100}/stock-account`} key={100} style={{ verticalAlign: "top", fontSize: "12px" }}>
          자세히 보러가기
          <ArrowForwardIosIcon
            fontSize="12px"
            sx={{
              color: theme.palette.primary[200],
              cursor: "pointer",
            }}
          />
        </Link>
      </Grid>

 {/*구분선*/}
 <Grid
        item
        xs={12}
        style={{ paddingTop: "3px", paddingBottom: 20, display: "flex", justifyContent: 'center',margin:'10px',marginTop:'20px'}}
      >
        <Divider
          sx={{
            width: "90%",
          }}
        />
      </Grid>



</Grid>

     
     
      {/*표*/}
      <Grid container direction="row" style={{ display: "flex", justifyContent: "space-around" }}>
        <Grid item xs={6} md={3}>
            <div className="custom-title-item">총 매입</div>
        </Grid>
        <Grid item xs={6} md={3} >
            <div className="custom-title-item">100,000</div>
            
        </Grid>
        <Grid item xs={6} md={3}>
            <div className="custom-title-item">추정자산</div>
        </Grid>
        <Grid item xs={6} md={3} >
            <div className="custom-title-item">100,000</div>
            
        </Grid>
      </Grid>
      <Grid container direction="row" style={{ display: "flex", justifyContent: "space-around" }}>
        <Grid item xs={6} md={3}>
            <div className="custom-title-item">총 평가</div>
        </Grid>
        <Grid item xs={6} md={3} >
            <div className="custom-title-item">100,000</div>
            
        </Grid>
        <Grid item xs={6} md={3}>
            <div className="custom-title-item">평가손익</div>
        </Grid>
        <Grid item xs={6} md={3} >
            <div className="custom-title-item">100,000</div>
            
        </Grid>
      </Grid>

      {/*증권거래소 입장*/}
      {/*
      <Grid container sx={{ display: "flex", justifyContent: "center", mt: "5%" }}>
        <Button variant="outlined" href={`/taxmate/stock-market`} sx={{ width: "90%" }}>증권 거래소 입장</Button>
      </Grid>
      */}

      <Box margin="20px" />

      {/* 주식 목록 */}
      <Grid item xs={12}>
        <StockListItem company={company} />
        <Divider sx={{ my: 1.5 }} />
        <StockListItem company={company} />
        <Divider sx={{ my: 1.5 }} />
        <StockListItem company={company} />
        <Grid>
          <Pagination
            count={5}
            sx={{
              "& > *": {
                marginTop: theme.spacing(5),
                justifyContent: "center",
                display: "flex",
              },
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Stock;
