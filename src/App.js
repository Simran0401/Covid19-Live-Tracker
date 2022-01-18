import React, { useEffect, useState } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import "./App.css";

function App() {
  // STATE --> How to write a variable in REACT

  const [countries, setCountries] = useState([]);

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

  return (
    <div className="App">
      <div className="app_header">
        <h1>COVID-19 LIVE TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value=" ">
            {/* Loop through all the countries and show a dropdown list of the options */}
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* Header */}
      {/* Title + World Dropdown field */}
      {/* Infoboxes */}
      {/* Infoboxes */}
      {/* Infoboxes */}
      {/* Table display countries with their respective covid-19 cases */}
      {/* Graph */}
      {/* World Map */}
    </div>
  );
}

export default App;
