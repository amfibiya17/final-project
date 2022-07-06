import React from 'react';
import useAxios from '../hooks/useAxios';
import axios from '../apis/api';

function Register() {
  const [data, error, loading] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: '/',
  });

  return (
    <div>
      <input type="text" placeholder="Enter Name" name="name" id="name" required />
      <input type="text" placeholder="Enter Email" name="email" id="email" required />
      <input type="password" placeholder="Enter Password" name="psw" id="psw" required />
      <button type="submit" className="register">Register</button>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>Error</p>}
      {!loading && !error && data && (
      <p>
        { data?.data}
        {' '}
      </p>
      )}
      {!loading && !error && !data && <p>No data to display</p>}
    </div>
  );
}

export default Register;
