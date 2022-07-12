import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import PersonalCalendar from './components/personalCalendar';
import GroupCalendar from './components/groupCalendar';
import FirstPage from './components/firstPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<FirstPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/home" element={<PersonalCalendar />} />
          <Route exact path="/group_event" element={<GroupCalendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
