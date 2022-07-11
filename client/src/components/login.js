import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event) {
    event.preventDefault();
    const response = await axios.post('http://localhost:8282/users/login', {
      email,
      password,
    });

    console.log(response.data);

    if (response.data.user) {
      localStorage.setItem('token', response.data.user);
      alert('Login successful');
      navigate('/home');
    } else {
      alert('Please check your username and password');
    }

    setEmail('');
    setPassword('');
  }

  return (
    <div className="Login">

      <form onSubmit={loginUser}>

        <div className="input-container">
          <i className="zmdi zmdi-account zmdi-hc-lg" />
          <input
            className="input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </div>

        <div className="input-container">
          <i className="zmdi zmdi-lock zmdi-hc-lg" />
          <input
            className="input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>

        <button className="login-button" type="submit">Log In</button>

      </form>

    </div>
  );
}

export default Login;
