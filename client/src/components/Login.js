/* eslint-disable no-alert */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendServer = 'http://localhost:4000';

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event) {
    event.preventDefault();

    const response = await axios.post(`${backendServer}/users/login`, {
      email,
      password,
    });

    if (response.status === 200) {
      localStorage.setItem('token', response.data.user);
      history('/login');
      alert('Login successful');
      window.location.href = '/profile';
    } else {
      alert('Please check your username and password');
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
