import axios from 'axios';
import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event) {
    event.preventDefault();
    const response = await axios.post('http://localhost:8282/users/login', {
      email,
      password,
    });

    setEmail('');
    setPassword('');
    console.log(response.data);
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Signup" />
      </form>
    </div>
  );
}

export default Login;
