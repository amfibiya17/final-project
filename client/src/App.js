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

  console.log(datesToAddClassTo);

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

  return (
    <Calendar
      onChange={onChange}
      value={value}
      // tileDisabled={tileDisabled}
      // tileContent={tileContent}
      tileClassName={tileClassName}
    />
  );
}

export default App;
