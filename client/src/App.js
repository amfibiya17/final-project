import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import PersonalCalendar from './components/personalCalendar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/home" element={<PersonalCalendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
