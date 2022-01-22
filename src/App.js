import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";

function App() {
  // STATE --> How to write a variable in REACT

  const [countries, setCountries] = useState([]); // To have all the countries in the dropdown list
  const [country, setCountry] = useState("globally"); //To have the default 'globally' and when when clicked on any other country, that country takes place instead of the 'globally'

  // USE EFFECT --> Runs a given piece of code based on a given condition
  useEffect(() => {
    //The code inside here will run once when the component loads and not again
    // async request --> sends it to the server and wait for it and do something with the info

    const getCountriesData = async () => {
      await fetch(" https://disease.sh/v3/covid-19/countries ")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // Shows entire names of countries like United Kingdom, United States of America, France
            value: country.countryInfo.iso2, //Shows abbreviations of countries like UK,USA,FR
          }));

          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);
  };

  return (
    <div className="App">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 LIVE TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="globally">Globally</MenuItem>
              {/* Loop through all the countries and show a dropdown list of the options */}
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
          <InfoBox title="Recovered" cases={123} total={3000} />
          <InfoBox title="Deaths" cases={123} total={4000} />
          {/* Infoboxes */}
          {/* Infoboxes */}
          {/* Infoboxes */}
        </div>

        {/* World Map */}
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table display countries with their respective covid-19 cases */}
          <h3>Worldwide New Cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
