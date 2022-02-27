import './App.css';
import { useState } from 'react';
import { MyMap } from './Map/MyMap';
import Form from './Form/Form';

const App = () => {
  const [result, setResult] = useState(["no result"]);
  return (
    <div className="App">
      hackathon project
      <div>
      {result}
      <MyMap/>
      </div>  
      <Form setState={setResult}/>
      {/* <button onClick={getResult(setResult, req)} style={{margin:'20px'}}>
        get result
      </button> */}
    </div>
  );
}

export default App;
