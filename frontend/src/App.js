import './App.css';
import { useState } from 'react';
import Form from './Form/Form';
import { List, ListItem, ListItemText } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import { BsFillFlagFill } from 'react-icons/bs';

const testJSON = [
  {
      "pickupTime": "2022-03-02T16:00:00",
      "arriveTime": "2022-03-03T04:50:00",
      "start": {
          "latitude": 32.0948,
          "longitude": -96.4582
      },
      "destination": {
          "latitude": 40.692,
          "longitude": -89.5894
      },
      "loadID": 434377877,
      "profit": 3774,
      "lastLoad": null
  },
  {
      "pickupTime": "2022-03-03T08:00:00",
      "arriveTime": "2022-03-03T09:38:32",
      "start": {
          "latitude": 42.9114,
          "longitude": -85.6917
      },
      "destination": {
          "latitude": 41.7308,
          "longitude": -84.9327
      },
      "loadID": 435520252,
      "profit": 2102,
      "lastLoad": null
  },
  {
      "pickupTime": "2022-03-03T11:00:00",
      "arriveTime": "2022-03-03T11:48:29",
      "start": {
          "latitude": 41.1573,
          "longitude": -85.4883
      },
      "destination": {
          "latitude": 40.6578,
          "longitude": -84.9519
      },
      "loadID": 435876207,
      "profit": 611,
      "lastLoad": null
  },
  {
      "pickupTime": "2022-03-03T13:00:00",
      "arriveTime": "2022-03-03T15:25:23",
      "start": {
          "latitude": 38.8947,
          "longitude": -81.9345
      },
      "destination": {
          "latitude": 40.5903,
          "longitude": -83.1294
      },
      "loadID": 434108037,
      "profit": 7032,
      "lastLoad": null
  },
  {
      "pickupTime": "2022-03-03T16:00:00",
      "arriveTime": "2022-03-03T16:35:02",
      "start": {
          "latitude": 40.5009,
          "longitude": -75.9699
      },
      "destination": {
          "latitude": 40.624,
          "longitude": -75.3799
      },
      "loadID": 435211537,
      "profit": 707,
      "lastLoad": null
  },
  {
      "pickupTime": "2022-03-03T17:00:00",
      "arriveTime": "2022-03-03T18:38:32",
      "start": {
          "latitude": 42.9114,
          "longitude": -85.6917
      },
      "destination": {
          "latitude": 41.7308,
          "longitude": -84.9327
      },
      "loadID": 435439199,
      "profit": 2102,
      "lastLoad": null
  },
  {
      "pickupTime": "2022-03-03T19:00:00",
      "arriveTime": "2022-03-03T19:00:00",
      "start": {
          "latitude": 33.461,
          "longitude": -81.9749
      },
      "destination": {
          "latitude": 33.461,
          "longitude": -81.9749
      },
      "loadID": 434342428,
      "profit": 2236,
      "lastLoad": null
  },
  {
      "pickupTime": "2022-03-03T21:00:00",
      "arriveTime": "2022-03-03T22:48:57",
      "start": {
          "latitude": 37.2706,
          "longitude": -79.9417
      },
      "destination": {
          "latitude": 36.3112,
          "longitude": -78.5921
      },
      "loadID": 434451131,
      "profit": 927,
      "lastLoad": null
  }
]

const PointMarker = ({ text }) => {return (<div className={`${text}`} style={{ color: 'red' }}> {text} <BsFillFlagFill size={30}/></div>)};
const defaultProps = {
    center: {
      lat: 45.501690,
      lng: -73.567253
    },
    zoom: 4
  };
const App = () => {
  // const [result, setResult] = useState([]);
  const [result, setResult] = useState(testJSON);
  const [lat, setLat] = useState(-999);
  const [lng, setLng] = useState(-999);

  return (
    <div className="App">
      hackathon project
        <div>
        <div style={{ height: '50vh', width: '50%', marginLeft: '25%' }}>
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <PointMarker
          lat={lat}
          lng={lng}
          text="Start"  
        />

      </GoogleMapReact>
    </div>
        </div>
      <Form setState={setResult} setLat={setLat} setLng={setLng}/>
      {
            result.length ?
            (<List sx={{ width: '100%' }}>
                {result.map((r) => (
                  <ListItem>
                  <ListItemText primary={`Load ID: ${r.loadID}, Profit: ${r.profit}, Start: ${r.start.latitude}, ${r.start.longitude}, End: ${r.destination.latitude}, ${r.destination.longitude}`} />
                  </ListItem>
              ))}
            </List>) : <div/>
          }
    </div>
  );
}

export default App;