/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns';
import './personalCalendar.css';
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

function PersonalCalendar() {
  const [value, setValue] = useState(new Date());
  const [datesToAddClassTo, setAppointments] = useState([]);
  const [newDate, setNewDate] = useState(new Date());
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [wholeAppointment, setWholeAppointment] = useState([]);
  const [appointmentName, setAppointmentName] = useState('');

  function getAppointments() {
    axios.get('http://localhost:8282/appointments/calendar', {
      params: {
        user_id: '62c6e76cb3e3fbbb177870d5',
      },
    })
      .then((response) => {
        setWholeAppointment(response.data);
        const data = [];
        response.data.forEach((appointment) => {
          data.push(new Date(appointment.date));
        });
        setAppointments(data);
      });
  }

  useEffect(getAppointments, []);

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

  function appointmentInformation(appointmentDate) {
    let a = 0;
    wholeAppointment.forEach((appointment) => {
      // eslint-disable-next-line eqeqeq
      if (new Date(appointment.date).toDateString() == new Date(appointmentDate).toDateString()) {
        setAppointmentName(appointment.name);
        a = 1;
      }
    });
    if (a === 0) {
      setAppointmentName('');
    }
  }

  function onChange(nextValue) {
    setValue(nextValue);
    appointmentInformation(nextValue);
  }

  async function submitEvent(event) {
    event.preventDefault();
    const response = await axios.post('http://localhost:8282/appointments/new', {
      date: new Date(newDate),
      name,
      user_id: user,
    });

    const { data } = response;

    console.log(data);

    getAppointments();
    setNewDate(new Date());
    setName('');
    setUser('');
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
      <p>
        {appointmentName}
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

export default PersonalCalendar;
