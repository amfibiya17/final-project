import axios from 'axios';
import React, { useState } from 'react';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signupUser(event) {
    event.preventDefault();
    const response = await axios.post('http://localhost:8282/users/signup', {
      name,
      email,
      password,
    });

    setName('');
    setEmail('');
    setPassword('');
    console.log(response.data);
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={signupUser}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Name"
        />
        <br />
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

export default Signup;
