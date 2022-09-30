import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { firebase } from "../config/fire-conf";
import "firebase/firestore";
import "firebase/auth";
import { Button } from "../pages";
import { StyledButton } from "./SignIn";
import { colors } from "./Light-Dark-Theme/ThemeConfig";

const StyledSpan = styled.span`
  width: fit-content;
  font-family: "Calibri";
  font-size: 25px;
  color: ${colors.light};
`;

const StyledDiv = styled.div`
  width: 100vw;
  display: grid;
  position: absolute;
  background-color: ${colors.dark};
  bottom: 0px;
  color: ${colors.light};
  grid-template-rows: 1fr;
  grid-template-columns: 450px 500px 3fr;
  align-items: center;
  padding-left: 5px;

  @media (max-width: 1270px) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledForm = styled.form`
  width: fit-content;
  margin: 0;
`;

const RemoveButton = styled(StyledButton)`
  margin: 3px;
`;

function GeoApi(props) {
  const { setWeatherForecast, setWeatherNow, userData, signInStatus, setLongLat } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [locationName, setLocationName] = useState("Linn, Kansas");
  const [locationsGrids, setLocationsGrids] = useState([{ id: "Linn, Kansas", office: "TOP", gridX: 31, gridY: 80 }]);
  const [currentLocationGrid, setCurrentLocationGrid] = useState({ office: "TOP", gridX: 31, gridY: 80 });
  const [errorStatus, setErrorStatus] = useState(false);
  const API_KEY = process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY;

  const fetchSavedLocations = () => {
    setLocationsGrids([]);
    firebase
      .firestore()
      .collection(userData.additionalUserInfo.profile.id)
      .get()
      .then((res) => {
        setLocationsGrids([]);
        res.docs.forEach((item) => {
          if (!locationsGrids.includes(item)) {
            setLocationsGrids((array) => [...array, { id: item.id, grid: item.data() }]);
          }
        });
      });
  };

  useEffect(() => {
    if (signInStatus) {
      fetchSavedLocations();
    }
  }, [signInStatus]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  async function fetchCoords() {
    if (API_KEY === null) {
      console.log("Geolocation API key not set.");
    }

    const firstRes = await fetch(`https://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${searchTerm}`);
    const firstData = await firstRes.json();
    let long = 0;
    let lat = 0;

    for (let searchHitIndex = 0; searchHitIndex < firstData.data.length; searchHitIndex++) {
      if (firstData.data[searchHitIndex].country_code === "USA") {
        long = firstData.data[searchHitIndex].longitude;
        lat = firstData.data[searchHitIndex].latitude;
        setLocationName(firstData.data[searchHitIndex].label);
        setLongLat([long, lat]);

        return { long, lat };
      }
    }

    setErrorStatus(true);
    alert("Location not found in the US.");
    return null;
  }

  async function fetchGrid(long, lat) {
    const secondRes = await fetch(`https://api.weather.gov/points/${lat},${long}`);
    const secondData = await secondRes.json();

    const office = secondData.properties.gridId;
    const gridX = secondData.properties.gridX;
    const gridY = secondData.properties.gridY;

    return { office, gridX, gridY };
  }

  async function fetchWeatherData(office, gridX, gridY) {
    setCurrentLocationGrid({ office: office, gridX: gridX, gridY: gridY });

    const firstRes = await fetch(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast/hourly?units=us`);
    const firstData = await firstRes.json().then((res) => {
      setWeatherNow(res);
    });

    const secondRes = await fetch(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast?units=us`);
    const secondData = secondRes.json().then((res) => {
      setWeatherForecast(res);
    });
  }

  async function fetchSavedLocation(office, gridX, gridY, location) {
    setCurrentLocationGrid({ office: office, gridX: gridX, gridY: gridY });
    setLocationName(location);

    const firstRes = await fetch(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast/hourly?units=us`);
    const firstData = await firstRes.json().then((res) => {
      setWeatherNow(res);
      setLongLat([res.geometry.coordinates[0][0][0], res.geometry.coordinates[0][0][1]]);
    });

    const secondRes = await fetch(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast?units=us`);
    const secondData = secondRes.json().then((res) => {
      setWeatherForecast(res);
    });
  }

  //Gets weather data when Search button clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      return;
    }

    const longLat = await fetchCoords();
    if (longLat) {
      const long = (await longLat).long;
      const lat = (await longLat).lat;

      const gridData = fetchGrid(long, lat);
      const office = (await gridData).office;
      const gridX = (await gridData).gridX;
      const gridY = (await gridData).gridY;

      fetchWeatherData(office, gridX, gridY);
    } else {
      return;
    }
  };

  const saveLocation = () => {
    //userData.additionalUserInfo.profile.id
    if (userData) {
      firebase.firestore().collection(userData.additionalUserInfo.profile.id).doc(locationName).set(currentLocationGrid);
      fetchSavedLocations();
    } else {
      alert("User must be signed in to save location");
    }
  };

  const removeLocation = (location) => {
    firebase.firestore().collection(userData.additionalUserInfo.profile.id).doc(location).delete();
    const newList = locationsGrids.filter((item) => item.id !== location);
    setLocationsGrids(newList);
  };

  return (
    <StyledDiv>
      <StyledForm autoComplete="off" onSubmit={handleSubmit}>
        <input autoComplete="off" type="text" onChange={handleChange} />
        <StyledButton type="submit">Search</StyledButton>
      </StyledForm>
      <StyledSpan>
        {locationName} <StyledButton onClick={saveLocation}>Save Location</StyledButton>
      </StyledSpan>
      <div>
        {signInStatus &&
          locationsGrids.map((item) => {
            return (
              <StyledSpan key={item.id}>
                <StyledButton onClick={() => fetchSavedLocation(item.grid.office, item.grid.gridX, item.grid.gridY, item.id)}>{item.id}</StyledButton>
                <RemoveButton onClick={() => removeLocation(item.id)}>X</RemoveButton>
              </StyledSpan>
            );
          })}
      </div>
    </StyledDiv>
  );
}

export default styled(GeoApi)``;
