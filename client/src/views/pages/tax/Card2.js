import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Paper, Stack } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { styled } from "@mui/material/styles";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const expData = {
  labels: ["문화비", "교육비", "환경미화비", "기타"],
  datasets: [
    {
      labels: ["문화비", "교육비", "환경미화비", "기타"],
      data: [30, 20, 25, 25],
      borderWidth: 2,
      hoverBorderWidth: 3,
      backgroundColor: ["#1C5085", "#54A0FF", "#98C6FF", "#64D5FF"],
      fill: true,
    },
  ],
};

const card = (
  <React.Fragment mt={2}>
    <CardContent style={{ display: "flex" }}>
      <Grid
        item
        xs={6}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Stack spacing={3}>
          <Item style={{ display: "flex" }}>
            <Grid item xs={12}>
              <span style={{ color: "#000000", fontSize: "24px" }}>
                문화비{" "}
              </span>
            </Grid>
            <Grid item xs={12}>
              <span style={{ color: "#2F80ED", fontSize: "24px" }}>22,000</span>
            </Grid>
          </Item>
          <Item style={{ display: "flex" }}>
            <Grid item xs={12}>
              <span style={{ color: "#000000", fontSize: "24px" }}>
                교육비{" "}
              </span>
            </Grid>
            <Grid item xs={12}>
              <span style={{ color: "#2F80ED", fontSize: "24px" }}>12,500</span>
            </Grid>
          </Item>
          <Item style={{ display: "flex" }}>
            <Grid item xs={12}>
              <span style={{ color: "#000000", fontSize: "24px" }}>
                환경미화비{" "}
              </span>
            </Grid>
            <Grid item xs={12}>
              <span style={{ color: "#2F80ED", fontSize: "24px" }}>10,000</span>
            </Grid>
          </Item>
          <Item style={{ display: "flex" }}>
            <Grid item xs={12}>
              <span style={{ color: "#000000", fontSize: "24px" }}>기타</span>
            </Grid>
            <Grid item xs={12}>
              <span style={{ color: "#2F80ED", fontSize: "24px" }}>15,000</span>
            </Grid>
          </Item>
        </Stack>
      </Grid>
      <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
        <Grid itme xs={8}>
          <Doughnut
            options={{
              legend: {
                display: true,
                reverse: true,

                position: "left",
              },
            }}
            data={expData}
            style={{ position: "relative", width: "100px" }}
          />
        </Grid>
      </Grid>
    </CardContent>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
