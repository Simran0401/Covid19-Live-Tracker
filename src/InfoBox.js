import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent className="infobox_cases">
        {/*Title i.e, Coronavirus cases*/}
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>

        {/* +120k number of cases */}
        <h2 className="infoBox_cases">{cases}</h2>

        {/* 1.2M Total*/}
        <Typography className="infoBox_total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
