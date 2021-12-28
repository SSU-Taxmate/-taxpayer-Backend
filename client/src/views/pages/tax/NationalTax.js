import React from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import Paper from "@mui/material/Paper";
import { Stack, Grid, Typography, Divider } from "@mui/material";
import blueBox from "../../../assets/images/blue_box.svg";
import { styled } from "@mui/material/styles";
import { nominalTypeHack } from "prop-types";
import Card from "./Card";
import Card2 from "./Card2";

function NationalTax() {
  const expData = {
    labels: ["세입", "세출", "국채"],
    datasets: [
      {
        labels: ["세입", "세출", "국채"],
        data: [60, 13, 27],
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: [
          "rgba(238, 102, 121, 1)",
          "rgba(98, 181, 229, 1)",
          "rgba(255, 198, 0, 1)",
        ],
        fill: true,
      },
    ],
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const HeaderTitle = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: "#000000",
    background: "none",
    fontSize: "36px",
    marginLeft: "50px",
  }));
  const HeaderTitle2 = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: "#000000",
    background: "none",
    fontSize: "36px",
    display: "inline",
    width: "70%",
  }));

  return (
    <div>
      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
      >
        <Item>
          <Grid>
            <div
              style={{
                textAlign: "left",
                width: "500px",
                backgroundSize: "120px 30px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom 10% left",
                backgroundImage: `url(${blueBox})`,
              }}
            >
              <HeaderTitle>나라 세금</HeaderTitle>
            </div>
          </Grid>
        </Item>
        <Item>
          <Grid
            item
            xs={12}
            mt={2}
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Grid item xs={6}>
              <span style={{ color: "#000000", fontSize: "24px" }}>
                보유 세금{" "}
              </span>
            </Grid>
            <Grid item xs={6}>
              <span style={{ color: "#2F80ED", fontSize: "24px" }}>
                555,156{" "}
              </span>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            mt={2}
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Grid item xs={6}>
              <span style={{ color: "#000000", fontSize: "24px" }}>
                누적 국채{" "}
              </span>
            </Grid>
            <Grid item xs={6}>
              <span style={{ color: "#2F80ED", fontSize: "24px" }}>
                555,156,154{" "}
              </span>
            </Grid>
          </Grid>
        </Item>
        {/* 이번달재정 현황 */}
        <Item>
          <Grid mt={5}>
            <div
              style={{
                textAlign: "left",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "flex-end",
              }}
            >
              <HeaderTitle2>이번달 재정 현황</HeaderTitle2>
              <a>예전 재정 상황 보러가기</a>
            </div>
          </Grid>
        </Item>
        <Item>
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={6}>
              <Stack spacing={3} style={{ justifyContent: "space-around" }}>
                <Item style={{ display: "flex" }}>
                  <Grid item xs={6}>
                    <span style={{ color: "#000000", fontSize: "24px" }}>
                      세입{" "}
                    </span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={{ color: "#2F80ED", fontSize: "24px" }}>
                      183,000
                    </span>
                  </Grid>
                </Item>
                <Item style={{ display: "flex" }}>
                  <Grid item xs={6}>
                    <span style={{ color: "#000000", fontSize: "24px" }}>
                      세출{" "}
                    </span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={{ color: "#2F80ED", fontSize: "24px" }}>
                      183,000
                    </span>
                  </Grid>
                </Item>
                <Item style={{ display: "flex" }}>
                  <Grid item xs={6}>
                    <span style={{ color: "#000000", fontSize: "24px" }}>
                      발행국채{" "}
                    </span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={{ color: "#2F80ED", fontSize: "24px" }}>
                      183,000
                    </span>
                  </Grid>
                </Item>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Doughnut
                options={{
                  legend: {
                    position: "right",
                  },
                }}
                data={expData}
                style={{ position: "relative", width: "100px" }}
              />
            </Grid>
          </Grid>
        </Item>

        <Item>
          <Grid mt={5}>
            <div
              style={{
                textAlign: "left",
                display: "flex",
              }}
            >
              <HeaderTitle2>항목별 금액</HeaderTitle2>
            </div>
          </Grid>
        </Item>
      </Stack>
      <Grid container style={{ marginBottom: "20px" }}>
        <Grid
          container
          xs={12}
          mt={4}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginLeft: "30px" }}>세입 +</div>
          <div>2021.11.15-2021.11.21</div>
        </Grid>
      </Grid>
      <Card></Card>
      <Grid container style={{ marginBottom: "20px" }}>
        <Grid
          container
          xs={12}
          mt={4}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginLeft: "30px" }}>세출 -</div>
          <div>2021.11.15-2021.11.21</div>
        </Grid>
      </Grid>
      <Card2></Card2>
    </div>
  );
}

export default NationalTax;
