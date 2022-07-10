/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendServer = 'http://localhost:4000';

function Signup() {
  const history = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(event) {
    event.preventDefault();

    const response = await axios.post(`${backendServer}/users/signup`, {
      name,
      email,
      password,
    });

    if (response.status === 200) {
      history('/signup');
      window.location.href = '/login';
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Signup;
