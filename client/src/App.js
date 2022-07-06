import './App.css';
// import axios from 'axios';
import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Calendar from './components/Calendar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
