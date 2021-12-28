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
  labels: ["소득세", "부동산세", "부가가치세", "증권거래세"],
  datasets: [
    {
      labels: ["소득세", "부동산세", "부가가치세", "증권거래세"],
      data: [40, 20, 15, 25],
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
                소득세{" "}
              </span>
            </Grid>
            <Grid item xs={12}>
              <span style={{ color: "#2F80ED", fontSize: "24px" }}>18,000</span>
            </Grid>
          </Item>
          <Item style={{ display: "flex" }}>
            <Grid item xs={12}>
              <span style={{ color: "#000000", fontSize: "24px" }}>
                부동산세{" "}
              </span>
            </Grid>
            <Grid item xs={12}>
              <span style={{ color: "#2F80ED", fontSize: "24px" }}>17,500</span>
            </Grid>
          </Item>
          <Item style={{ display: "flex" }}>
            <Grid item xs={12}>
              <span style={{ color: "#000000", fontSize: "24px" }}>
                부가가치세{" "}
              </span>
            </Grid>
            <Grid item xs={12}>
              <span style={{ color: "#2F80ED", fontSize: "24px" }}>11,000</span>
            </Grid>
          </Item>
          <Item style={{ display: "flex" }}>
            <Grid item xs={12}>
              <span style={{ color: "#000000", fontSize: "24px" }}>
                증권거래세
              </span>
            </Grid>
            <Grid item xs={12}>
              <span style={{ color: "#2F80ED", fontSize: "24px" }}>12,700</span>
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
