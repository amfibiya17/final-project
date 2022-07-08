/* eslint-disable quotes */
/* eslint-disable import/no-duplicates */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns';
import './App.css';
// import axios from 'axios';

// const disabledDates = [new Date(), new Date(2022, 10, 4)];
// const datesToAddContentTo = [new Date(2022, 6, 13), new Date(2022, 10)];
const datesToAddClassTo = [new Date(2022, 6, 15), new Date(2022, 7, 2)];

function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

function tileClassName({ date, view }) {
  // Add class to tiles in month view only
  if (view === 'month') {
    // Check if a date React-Calendar wants to check is on the list of dates to add class to
    if (datesToAddClassTo.find((dDate) => isSameDay(dDate, date))) {
      return 'unavaliable';
    }
  }
}

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
//       return ' Dinner';
//     }
//   }
// }

function App() {
  // const datesToAddClassTo = [new Date(2022, 6, 15), new Date(2022, 7, 2)];
  const [date, setDate] = useState(new Date());
  // const [datesToAddClassTo, setDatesToAddClassTo] = useState([]);

  // React.useEffect(() => {
  //   axios.get('http://localhost:8282/appointments/calendar').then((response) => {
  //     const dates = [];
  //     response.data.forEach((appointment) => {
  //       dates.push(new Date(appointment.date));
  //     });
  //     setDatesToAddClassTo(dates);
  //   });
  // }, []);

  console.log(datesToAddClassTo);

  // React.useEffect(() => {
  //   axios.request({
  //     method: 'GET',
  //     url: 'http://localhost:8282/appointments/calendar',
  //     data: {
  //       user_id: '"62c6e76cb3e3fbbb177870d5"',
  //     },
  //   }).then((response) => {
  //     console.log(response.data);
  //     setAppointments(response.data);
  //   });
  // }, []);

  // function isSameDay(a, b) {
  //   return differenceInCalendarDays(a, b) === 0;
  // }

  // function tileClassName({ anotherDate, view }) {
  //   // Add class to tiles in month view only
  //   if (view === 'month') {
  //     // Check if a date React-Calendar wants to check is on the list of dates to add class to
  //     if (datesToAddClassTo.find((dDate) => isSameDay(dDate, anotherDate))) {
  //       return 'unavailable';
  //     }
  //   }
  // }

  function onChange(nextValue) {
    setDate(nextValue);
  }

  return (
    <div className="app">
      <Calendar
        onChange={onChange}
        value={date}
        // tileDisabled={tileDisabled}
        // tileContent={tileContent}
        tileClassName={tileClassName}
      />
      <p className="text-center">
        <span className="bold">Selected Date:</span>
        {' '}
        {date.toDateString()}
      </p>
    </div>
  );
}

export default App;
