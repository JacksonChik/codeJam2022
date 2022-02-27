import React from "react";
import GoogleMapReact from 'google-map-react';
import { BsFillFlagFill } from 'react-icons/bs';
import LineTo from 'react-lineto'

var randomColor = require('randomcolor'); 
var color = randomColor();

const PointMarker = ({ text }) => {return (<div className={`${text}`} style={{ color: 'red' }}> {text} <BsFillFlagFill/></div>)};

export const MyMap = () => {
  const defaultProps = {
    center: {
      lat: 45.501690,
      lng: -73.567253
    },
    zoom: 4
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '50%', marginLeft: '25%' }}>
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <PointMarker
          lat={45.501690}
          lng={-73.567253}
          text="Start"  
        />

        <PointMarker
          lat={46.510712}
          lng={-63.416813}
          text="End"  
        />
        <LineTo from="Start" to="End" borderColor="red"/>
      </GoogleMapReact>
    </div>
  );
}