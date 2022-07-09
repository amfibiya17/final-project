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
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/home" exact element={<PersonalCalendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
