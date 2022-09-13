import React, { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import CurrentWeather from "../components/Current-Weather/current-weather";
import WeeklyForecast from "../components/WeeklyForecast";
import GeoApi from "../components/GeoApi";

import CardContainer from "../components/CardContainer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toggleTheme } from "./_app";

const Button = styled.button`
  background-color: #f2df3a;
  border: 3px solid #000;
  border-radius: 10px;
  color: #000;
  font-size: 25px;
  margin: 5px;

  :hover {
    background-color: #000;
    color: #eaeaea;
    border: 3px solid #eaeaea;
    cursor: pointer;
  }
`;

const ThemeButton = styled.button`
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em;
  border: 2px solid;
  background-color: darkblue;
  color: antiquewhite;
`;

const StyledMonth = styled.h1`
  margin: 1px;
  padding: 1px;
  font-size: 3rem;
  position: absolute;
  left: 28vw;
  top: 16vh;
  `;
  const StyledSignIn = styled.div`
    position: absolute;
    top: 3rem;
    `;

import SignIn from "../components/SignIn";
import UserProfile from "../components/UserProfile";

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
const Home = ({ weatherInitialFetchWeekly, weatherInitialFetchNow, setTheme, theme }) => {
  const [weatherForecast, setWeatherForecast] = useState(weatherInitialFetchWeekly);
  const [weatherNow, setWeatherNow] = useState(weatherInitialFetchNow);
  const [signInStatus, setSignInStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  //Gets month name instead of number
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = new Date().getMonth();

  //Just console logs the weather forecast data
  const logWeatherData = () => {
    console.log("Forecast", weatherForecast);
    console.log("Now", weatherNow);
  };

  const toggleTheme = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div>
      <Head>
        <title>Weather App</title>
      </Head>
      <Header>
        Rock Sparrow Weather App
        <ThemeButton type="submit" onClick={toggleTheme}>
          {" "}
          Switch Theme
        </ThemeButton>
        </Header>
        <StyledMonth>
        {monthNames[month]}
        </StyledMonth>

        <StyledSignIn>
        <SignIn signInStatus={signInStatus} setSignInStatus={setSignInStatus} setUserData={setUserData} />

        <UserProfile userData={userData} signInStatus={signInStatus} />

        <GeoApi setWeatherForecast={setWeatherForecast} setWeatherNow={setWeatherNow} userData={userData} signInStatus={signInStatus} />
        </StyledSignIn>
      
        <CurrentWeather weatherNow={weatherNow} />
      <CardContainer>
        <WeeklyForecast weeklyWeather={weatherForecast} />
      </CardContainer>
      <Footer>
        <Button type="submit" onClick={logWeatherData}>
          Log Data
        </Button>
      </Footer>
    </div>
  );
};

export default styled(Home)``;
