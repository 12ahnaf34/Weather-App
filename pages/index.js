import React, { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import CurrentWeather from "../components/Current-Weather/current-weather";
import WeeklyForecast from "../components/WeeklyForecast";
import GeoApi from "../components/GeoApi";
import CardContainer from "../components/CardContainer";
import Header from "../components/Header";
import SignIn, { StyledButton } from "../components/SignIn";
import UserProfile from "../components/UserProfile";
import MapWrapper from "../components/MapWrapper";

export const Button = styled.button`
  background-color: #343434;
  border: 2px solid #967e76;
  font-family: "Calibri";
  font-size: 20px;
  font-weight: bold;
  color: #eee3cb;
  width: fit-content;

  :hover {
    background-color: #000;
    color: #eaeaea;
    border: 3px solid #eaeaea;
    cursor: pointer;
  }
`;

const Container = styled.div`
  height: 100%;
`;

const ThemeButton = styled.button`
  font-family: "Calibri";
  font-weight: bold;
  font-size: 20px;
  margin: 0.5em;
  padding: 0.25em;
  border: 2px solid #343434;
  background-color: #fcfaf1;
  color: #343434;
  transition: all 0.4s ease;

  :hover {
    margin-left: 15px;
    color: #343434;
    scale: 1.2;
    cursor: pointer;
  }
`;

const StyledMonth = styled.h1`
  margin: 1px;
  padding: 1px;
  font-family: "Calibri";
  font-size: 3rem;
  text-align: center;
`;

const StyledContainer = styled.div`
  /* border: 2px solid black; */
  display: flex;
  flex-direction: column;
  position: relative;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

const StyledUserContainer = styled.div`
  /* border: 2px solid green; */
  text-align: center;
  width: fit-content;
  flex-direction: column;
  font-size: 1.2rem;
`;

const EmptyDiv = styled.div`
  width: 1400px;
  height: 600px;
`;

async function getPointData(longitude, latitude) {
  const res = await fetch(`https://api.weather.gov/points/${longitude},${latitude}`);
  const data = await res.json();
  return {
    officeId: data.properties.gridId,
    gridX: data.properties.gridX,
    gridY: data.properties.gridY,
  };
}

//Fetches weather data of Linn Kansas, used to fill in state variables
export async function getServerSideProps() {
  const { officeId, gridX, gridY } = await getPointData(39.7456, -97.0892);
  const res = await fetch(`https://api.weather.gov/gridpoints/${officeId}/${gridX},${gridY}/forecast?units=us`);
  const weatherInitialFetchWeekly = await res.json();

  const secondRes = await fetch(`https://api.weather.gov/gridpoints/${officeId}/${gridX},${gridY}/forecast/hourly?units=us`);
  const weatherInitialFetchNow = await secondRes.json();

  return {
    props: { weatherInitialFetchWeekly, weatherInitialFetchNow },
  };
}

//data props for current weather and weekly weather
const Home = ({ weatherInitialFetchWeekly, weatherInitialFetchNow, setTheme, theme, loadMap }) => {
  const [weatherForecast, setWeatherForecast] = useState(weatherInitialFetchWeekly);
  const [weatherNow, setWeatherNow] = useState(weatherInitialFetchNow);
  const [signInStatus, setSignInStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [longLat, setLongLat] = useState([-97.0892, 39.7456]);
  const [map, setMap] = useState(null);
  const [mapDisplay, setMapDisplay] = useState(false);
  const [lightDark, setLightDark] = useState(true);
  //Gets month name instead of number
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = new Date().getMonth();

  const toggleTheme = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
    lightDark ? setLightDark(false) : setLightDark(true);
  };

  const toggleMap = () => {
    setMapDisplay(!mapDisplay);
  };

  return (
    <Container>
      <Head>
        <title>Weather App</title>
      </Head>
      <Header>
        <ThemeButton type="submit" onClick={toggleTheme}>
          {" "}
          Switch Theme
        </ThemeButton>
        <SignIn signInStatus={signInStatus} setSignInStatus={setSignInStatus} setUserData={setUserData} />
        <StyledButton onClick={toggleMap}>Map</StyledButton>
      </Header>
      <StyledUserContainer>
        <UserProfile userData={userData} signInStatus={signInStatus} />
      </StyledUserContainer>
      <StyledContainer>
        <StyledMonth>{monthNames[month]}</StyledMonth>
        <CurrentWeather weatherNow={weatherNow} lightDark={lightDark} />
        <CardContainer>
          <WeeklyForecast weeklyWeather={weatherForecast} />
        </CardContainer>
      </StyledContainer>
      <MapWrapper longLat={longLat} map={map} setMap={setMap} mapDisplay={mapDisplay} setMapDisplay={setMapDisplay} />
      <GeoApi
        setWeatherForecast={setWeatherForecast}
        setWeatherNow={setWeatherNow}
        userData={userData}
        signInStatus={signInStatus}
        setLongLat={setLongLat}
        map={map}
      />
    </Container>
  );
};

export default styled(Home)``;
