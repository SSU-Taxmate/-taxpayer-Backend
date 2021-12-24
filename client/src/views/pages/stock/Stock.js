import React from "react";
import { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Divider,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Container,
  Paper,
  Pagination,
} from "@mui/material";

import { gridSpacing } from "../../../store/constant";
import { styled } from "@mui/material/styles";

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

import StockLine from "./StockLine";
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
    padding: theme.spacing(2),
    fontSize: "18px",
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
      sx={{ justifyContent: "space-around" }}
      xs={12}
    >
      <Grid item xs={12}>
        <Grid container alignContent="center" justifyContent="flex-end">
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
        style={{ display: "flex", paddingBlockStart: "50px", fontSize: "36px" }}
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
          <Grid item sx={{ pr: "15px", fontSize: "14px" }}>
            평가금액
          </Grid>
          <Grid item>1000000000</Grid>
        </div>
      </Grid>
      <Divider
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          pb: 1.5,
          width: "900px",
        }}
      />
      <Item style={{ width: "30%" }}>
        <Grid container xs={12} mt={2} style={{ display: "flex" }}>
          <Grid item xs={12} sm={6}>
            <SecondHeaderTitle>총 매입 </SecondHeaderTitle>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <SecondHeaderData>555,156 </SecondHeaderData>
          </Grid>
        </Grid>
        <Grid item xs={12} mt={2} style={{ display: "flex" }}>
          <Grid item xs={6} style={{ display: "flex" }}>
            <SecondHeaderTitle>총 평가 </SecondHeaderTitle>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <SecondHeaderData>555,156,154 </SecondHeaderData>
          </Grid>
        </Grid>
      </Item>

      <Item style={{ width: "30%" }}>
        <Grid item xs={12} mt={2} style={{ display: "flex" }}>
          <Grid item xs={6}>
            <SecondHeaderTitle>추정자산 </SecondHeaderTitle>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <SecondHeaderData>555,156 </SecondHeaderData>
          </Grid>
        </Grid>
        <Grid item xs={12} mt={2} style={{ display: "flex" }}>
          <Grid item xs={6}>
            <SecondHeaderTitle>평가 손익 </SecondHeaderTitle>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <SecondHeaderData>555,156,154 </SecondHeaderData>
          </Grid>
        </Grid>
      </Item>

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
