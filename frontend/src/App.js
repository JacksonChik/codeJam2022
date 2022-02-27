import './App.css';
import { useState } from 'react';
import { MyMap } from './Map/MyMap';
import Form from './Form/Form';
import { ResultList } from './ResultList/ResultList';


const App = () => {
  const [result, setResult] = useState([]);
  return (
    <div className="App">
      hackathon project
        <div>
          <MyMap/>
          <ResultList resultState={result}/>
        </div>  
      <Form setState={setResult}/>
    </div>
  );
}

export default App;
