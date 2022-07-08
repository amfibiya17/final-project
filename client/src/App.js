/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns';
import './App.css';
import axios from 'axios';

// const disabledDates = [new Date(), new Date(2022, 10)];
// const datesToAddContentTo = [new Date(), new Date(2022, 10)];

// function tileDisabled({ date, view }) {
//   // Disable tiles in month view only
//   if (view === 'month') {
//     // Check if a date React-Calendar wants to check is on the list of disabled dates
//     return disabledDates.find((dDate) => isSameDay(dDate, date));
//   }
// }

// function tileContent({ date, view }) {
//   // Add class to tiles in month view only
//   if (view === 'month') {
//     // Check if a date React-Calendar wants to check is on the list of dates to add class to
//     if (datesToAddContentTo.find((dDate) => isSameDay(dDate, date))) {
//       return ' My content';
//     }
//   }
// }

function App() {
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
    <>
      <Calendar
        onChange={onChange}
        value={value}
        // tileDisabled={tileDisabled}
        // tileContent={tileContent}
        tileClassName={tileClassName}
      />
      <p className="text-center">
        <span className="bold">Selected Date:</span>
        {' '}
        {value.toDateString()}
      </p>
      <form onSubmit={submitEvent}>
        <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="user" />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default App;
