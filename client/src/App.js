/* eslint-disable */ 
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import './russ.css';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/signup" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function Profile() {
  const [value, setValue] = useState(new Date());
  const [datesToAddClassTo, setAppointments] = useState([new Date()]);
  const [newDate, setNewDate] = useState(new Date());
  const [name, setName] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8282/appointments/calendar', {
      params: {
        user_id: '62c6e76cb3e3fbbb177870d5',
      },
    })
      .then((response) => {
        const data = [];
        response.data.forEach((appointment) => {
          data.push(new Date(appointment.date));
        });
        setAppointments(data);
      });
  }, []);

  function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
  }

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (datesToAddClassTo.find((dDate) => isSameDay(dDate, date))) {
        return 'unavailable';
      }
    }
  }

  function onChange(nextValue) {
    setValue(nextValue);
  }

  async function submitEvent() {
    const response = await axios.post('http://localhost:8282/appointments/new', {
      date: new Date(newDate),
      name,
      user_id: user,
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <div className='app'>
      <h1 className='text-center'>Personal Calendar</h1>
      <div className='calendar-container'>
        <Calendar
          onChange={onChange}
          value={value}
          tileClassName={tileClassName}
          selectRange={true}
          minDate={new Date()}
          minDetail='decade'
        />
      </div>
      {value.length > 0 ? (
        <p className='text-center'>
          <span className='bold'>Start:</span>{' '}
          {value[0].toDateString()}
          &nbsp;|&nbsp;
          <span className='bold'>End:</span> {value[1].toDateString()}
        </p>
      ) : (
        <p className='text-center'>
          <span className='bold'>Default selected date:</span>{' '}
          {value.toDateString()}
        </p>
      )}
      <form onSubmit={submitEvent}>
        <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="user" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function SignUp() {
  return <h2>Sign Up Here!</h2>;
}