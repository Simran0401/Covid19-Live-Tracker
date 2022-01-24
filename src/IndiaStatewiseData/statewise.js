import React, { useState, useEffect } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./statewise.css";

function Statewise() {
  const [stateData, setStateData] = useState([]);
  const getCovidData = async () => {
    const response = await fetch("https://data.covid19india.org/data.json");
    const actualData = await response.json();
    setStateData(actualData.statewise);
  };
  useEffect(() => {
    getCovidData();
  }, []);

  return (
    <div>
      <div className="dashboard">
        <div className="dashboard-heading">
          <h3>Covid-19 Dashboard - INDIA</h3>
        </div>

        <div className="dashboard-table-scroll">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>State</th>
                <th>Confirmed</th>
                <th>Recovered</th>
                <th>Deaths</th>
                <th>Active</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {stateData.map((states, index) => {
                return (
                  <tr key={index}>
                    <td data-label="State">{states.state}</td>
                    <td data-label="Confirmed">{states.confirmed}</td>
                    <td data-label="Recovered">{states.recovered}</td>
                    <td data-label="Deaths">{states.deaths}</td>
                    <td data-label="Active">{states.active}</td>
                    <td data-label="Updated">{states.lastupdatedtime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Statewise;
