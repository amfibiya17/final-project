/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import axios from 'axios';

axios.get('http://localhost:4000/users/login')
  .then((response) => {
    console.log(response.data);
  });

function App() {
  return (
    <div className="App">
      <h1>hi</h1>
    </div>
  );
}

export default App;
