import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import styled from "styled-components";
import { Box } from "@mui/system";
import { colors } from "../Light-Dark-Theme/ThemeConfig";

const StyledCard = styled(Card)`
  margin: 10px;
  padding: 10px;
  text-align: center;
  color: ${colors.light};
  text-decoration: none;
  border: 3px solid ${({ borderColor }) => borderColor || colors.teal};
  border-radius: 50px;
  transition: color 0.15s ease, border-color 0.15s ease;
  background: ${({ backgroundColor }) => backgroundColor || colors.dark};
  display: flex;
  margin-left: auto;
  margin-right: auto;

  :hover,
  :focus,
  :active {
    color: ${colors.light};
    border-color: ${colors.dark};
    background-color: ${colors.teal};
    cursor: default;
  }
`;

const CurrentDate = styled.p`
  font-family: Arial;
  font-size: 60px;
  text-align: center;
  margin: 0;
`;
const StyledDiv = styled.div`
  text-align: center;
`;

const CurrentWeather = ({ weatherNow, lightDark }) => {
  const properties = weatherNow.properties;
  if (!properties) {
    return (
      <h1>
        {weatherNow.title}
        <br />
        {weatherNow.detail}
        <br />
        {weatherNow.status}
      </h1>
    );
  }

  const periods = properties.periods;
  const firstPeriod = periods[0];

  return (
    <Box sx={{ display: "flex" }}>
      <StyledCard
        backgroundColor={lightDark ? colors.dark : colors.teal}
        borderColor={lightDark ? colors.teal : colors.light}
        sx={{ width: "fit-content", maxWidth: "fit-content", maxHeight: "100%", textAlign: "center" }}
      >
        <CardContent sx={{ flex: "auto", width: "fit-content" }}>
          <StyledDiv>
            <CurrentDate>
              {firstPeriod.startTime[8]}
              {firstPeriod.startTime[9]}
            </CurrentDate>
          </StyledDiv>
          <Typography variant="h5" sx={{ position: "relative" }}>
            {firstPeriod.temperature}°{firstPeriod.temperatureUnit}
          </Typography>
          <Typography variant="subtitle2">
            <p>{firstPeriod.shortForecast}</p>
          </Typography>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default styled(CurrentWeather)``;
