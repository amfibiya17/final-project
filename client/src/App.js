/* eslint-disable react/react-in-jsx-scope */
import './App.css';
// import axios from 'axios';
import Register from './components/Register';

// axios.get('http://localhost:4000/users/login')
//   .then((response) => {
//     console.log(response.data);
//   });

function App() {
  return (
    <main className="App">
      <Register />
    </main>
  );
}

export default App;
