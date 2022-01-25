import React, { useState, useEffect } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./statewise.css";

function Statewise() {
  const [stateData, setStateData] = useState([]);
  const getCovidData = async () => {
    const response = await fetch(
      "https://api.rootnet.in/covid19-in/stats/latest"
    );
    const actualData = await response.json();
    setStateData(actualData.data.regional);
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
                <th>Discharged</th>
                <th>Deaths</th>
              </tr>
            </thead>
            <tbody>
              {stateData.map((states, index) => {
                return (
                  <tr key={index}>
                    <td data-label="State">{states.loc}</td>
                    <td data-label="Confirmed">{states.totalConfirmed}</td>
                    <td data-label="Discharged">{states.discharged}</td>
                    <td data-label="Deaths">{states.deaths}</td>
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
