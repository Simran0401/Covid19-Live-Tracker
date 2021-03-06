import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import "leaflet/dist/leaflet.css";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import "./App.css";
import Statewise from "./IndiaStatewiseData/statewise.js";

function App() {
  // STATE --> How to write a variable in REACT

  const [countries, setCountries] = useState([]); // To have all the countries in the dropdown list
  const [country, setCountry] = useState("globally"); //To have the default 'globally' and when when clicked on any other country, that country takes place instead of the 'globally'
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  // USE EFFECT --> Runs a given piece of code based on a given condition

  //This useEffect() is used to fetch and show after the worldwide/global COVID-19 info just as the user loads the webpage
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  //This useEffect() is used to fetch each country's respective COVID-19 info
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

          const sortedData = sortData(data);
          // setTableData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "globally"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  return (
    <div className="App">
      <div className="app_left">
        <div className="app_header">
          <h1>
            <span>AWARE</span> - A LIVE COVID-19 TRACKER
          </h1>
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
          <InfoBox
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.casesPerOneMillion)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            title="Recovered"
            cases={prettyPrintStat(countryInfo.recoveredPerOneMillion)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            title="Deaths"
            cases={prettyPrintStat(countryInfo.deathsPerOneMillion)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>
        <div>
          <Statewise />
        </div>
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table display countries with their respective covid-19 cases */}
          <Table countries={tableData} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
