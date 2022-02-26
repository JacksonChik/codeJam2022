import './App.css';
import axios from 'axios';
import { useState } from 'react';

const url = 'http://localhost:9090/';

const getResult = (setState) => async() => {
    try{
        console.log("request sent");
        const { data } = await axios.get(url);
        console.log("response received: ", data);
        setState(data);
    } catch (error) {
        console.log(error)
    }
}

const App = () => {
  const [result, setResult] = useState(["no result"]);
  return (
    <div className="App">
      hackathon project
      <div>
      {result}
      </div>  
      <button onClick={getResult(setResult)}>
        get result
      </button>
    </div>
  );
}

export default App;
