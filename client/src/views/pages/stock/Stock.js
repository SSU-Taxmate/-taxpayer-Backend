import React from "react";
import { useState } from "react";

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
} from "@mui/material";
import { Link } from "react-router-dom";
import { gridSpacing } from "../../../store/constant";
import { styled } from "@mui/material/styles";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

import StockLine from "./StockList";
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

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));
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

      <Grid
        item
        xs={12}
        style={{ display: "flex", justifyContent: 'center', paddingBlockStart: "50px", fontSize: "36px" }}
      >
        <div
          style={{ display: "flex", fontWeight: "bold", marginRight: "50px" }}
        >
          <div
            style={{
              textAlign: "right",
              width: "130px",
              backgroundSize: "120px 30px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left 30%",
              backgroundImage: `url(${blueBox})`,
            }}
          >
            홍길동
          </div>
          님의 주식

        </div>
        <div style={{ display: "flex", fontWeight: "bold" }}>
          <Grid item sx={{ paddingRight: "15px", fontSize: "14px" }}>
            평가금액
          </Grid>
          <Grid item>1000000000</Grid>

        </div>
      </Grid>


      {/*자세히보러가기*/}
      <Grid
        item
        style={{ display: "flex", justifyContent: 'flex-end', paddingTop: "30px", width: "96%" }}
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
        style={{ paddingTop: "3px", paddingBottom: 20, display: "flex", justifyContent: 'center' }}
      >
        <Divider
          sx={{
            width: "90%",
          }}
        />
      </Grid>

      {/*표*/}
      <Grid container spacing={2}>
        <Grid item xs={1} md={1} />
        <Grid item xs={2} md={2}>
          <Item><SecondHeaderTitle>총매입</SecondHeaderTitle></Item>
        </Grid>
        <Grid item xs={2} md={2}>
          <Item><SecondHeaderData>11111111</SecondHeaderData></Item>
        </Grid>
        <Grid item xs={2} md={2}>
        </Grid>
        <Grid item xs={2} md={2}>
          <Item><SecondHeaderTitle>추정자산</SecondHeaderTitle></Item>
        </Grid>
        <Grid item xs={2} md={2}>
          <Item><SecondHeaderData>2222222222</SecondHeaderData></Item>
        </Grid>
        <Grid item xs={1} md={1} />
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={1} md={1} />
        <Grid item xs={2} md={2}>
          <Item><SecondHeaderTitle>총평가</SecondHeaderTitle></Item>
        </Grid>
        <Grid item xs={2} md={2}>
          <Item><SecondHeaderData>11111111</SecondHeaderData></Item>
        </Grid>
        <Grid item xs={2} md={2}>
        </Grid>
        <Grid item xs={2} md={2}>
          <Item><SecondHeaderTitle>평가손익</SecondHeaderTitle></Item>
        </Grid>
        <Grid item xs={2} md={2}>
          <Item><SecondHeaderData>2222222222</SecondHeaderData></Item>
        </Grid>
        <Grid item xs={1} md={1} />
      </Grid>

      {/*증권거래소 입장*/}
      <Grid container sx={{ display: "flex", justifyContent: "center", mt: "5%" }}>
        <Button variant="outlined" href={`/taxmate/stock-market`} sx={{ width: "90%" }}>증권 거래소 입장</Button>
      </Grid>

      {/* 주식 목록 */}
      <Grid item xs={12}>
        <StockLine company={company} />
        <Divider sx={{ my: 1.5 }} />
        <StockLine company={company} />
        <Divider sx={{ my: 1.5 }} />
        <StockLine company={company} />
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
