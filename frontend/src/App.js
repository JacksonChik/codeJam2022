import './App.css';
import { useState } from 'react';
import { MyMap } from './Map/MyMap';
import Form from './Form/Form';
import { ResultList } from './ResultList/ResultList';
import { Grid } from '@material-ui/core';


const App = () => {
  const [result, setResult] = useState([]);
  return (
    <div className="App">
      hackathon project
        <div>
          <MyMap/>
          {/* <ResultList resultState={result}/> */}
          {
            result.length?
            (
              <Grid container alignItems="stretch" spacing={3}>
              {result.map((r) => (
                <Grid key={r.loadID} item xs={12} sm={6} md={6}>
                  <div>
                  {`Load ID: ${r.loadID}, Profit: ${r.profit}`}
                  {`Start: ${r.start.latitude}, ${r.start.longitude}, End: ${r.destination.latitude}, ${r.destination.longitude}`}
                  </div>
                </Grid>
              ))}
            </Grid>
              )
              : <div/>
          }

        </div>  
      <Form setState={setResult}/>
    </div>
  );
}

export default App;