import React from "react";
import Image from "next/image";
import { Box, Card, CardContent, Typography } from "@mui/material";

function WeeklyForecast({ weeklyWeather }) {
  const properties = weeklyWeather.properties;
  const periods = properties.periods;
  const firstPeriod = periods[0];

  return (
    <Box sx={{ display: "flex" }}>
      {periods.map((item, index) => {
        if (index == 0 || item.isDaytime === false) {
          return;
        }
        return (
          <div key={index}>
            <Card
              sx={{
                Width: "fit-content",
                fontFamily: "Arial",
                textAlign: "center",
                backgroundColor: "#F5EFE6",
                border: "2px solid #967E76",
                color: "#343434",
                margin: "1rem",
                "&:hover": {
                  backgroundColor: "#967E76",
                  border: "2px solid #EEE3CB",
                  color: "#EEE3CB",
                  scale: "1.3",
                  cursor: "default",
                },
              }}
            >
              <CardContent>
                <Typography fontSize={23} fontWeight={600} fontFamily={"Calibri"}>
                  {item.name}
                </Typography>
                <Typography fontSize={25}>
                  {item.temperature}
                  {firstPeriod.temperatureUnit}
                </Typography>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </Box>
  );
}

export default WeeklyForecast;
