import React from "react"
import { Grid, CircularProgress } from '@material-ui/core';

export const ResultList = (resultState) => {
    return(
    !resultState.length ? <CircularProgress /> : (
    <Grid container alignItems="stretch" spacing={3}>
    {resultState.map((result) => (
      <Grid key={result.loadID} item xs={12} sm={6} md={6}>
        <div>
        {`Load ID: ${result.loadID}, Profit: ${result.profit}`}
        {`Start: ${result.start.latitude}, ${result.start.longitude}, End: ${result.destination.latitude}, ${result.destination.longitude}`}
        </div>
      </Grid>
    ))}
  </Grid>
    )
    );
  };
  