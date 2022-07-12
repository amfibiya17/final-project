/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns';
import './personalCalendar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const disabledDates = [new Date(), new Date(2022, 10)];
// const datesToAddContentTo = [new Date(), new Date(2022, 10)];

// function tileContent({ date, view }) {
//   // Add class to tiles in month view only
//   if (view === 'month') {
//     // Check if a date React-Calendar wants to check is on the list of dates to add class to
//     if (datesToAddContentTo.find((dDate) => isSameDay(dDate, date))) {
//       return ' My content';
//     }
//   }
// }

function GroupCalendar() {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const [disabledDates, setDisabledDates] = useState([]);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState();
  const [userArray, setUserArray] = useState([]);
  const [usersAll, setUsersAll] = useState([]);
  // const [weather, setWeather] = useState();

  function getAppointments() {
    if (userId) {
      axios.get('http://localhost:8282/appointments/calendar', {
        params: {
          user_id: userArray,
        },
      })
        .then((response) => {
          const data = [];
          response.data.forEach((appointment) => {
            data.push(new Date(appointment.date));
          });
          setDisabledDates(data);
        });
    }
  }

  async function getUserId() {
    await axios.get('http://localhost:8282/users/userId', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then((response) => {
        setUserId(response.data);
        setUserArray(response.data);
      });
  }

  async function getAllUsers() {
    await axios.get('http://localhost:8282/users/all')
      .then((response) => {
        setUsersAll([response.data]);
        console.log(response.data);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      getUserId();
      getAllUsers();
    }
  }, []);

  useEffect(() => {
    setUserArray([userId]);
    getAppointments();
  }, [userId]);

  function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
  }

  // function tileClassName({ date, view }) {
  //   // Add class to tiles in month view only
  //   if (view === 'month') {
  //     // Check if a date React-Calendar wants to check is on the list of dates to add class to
  //     if (datesToAddClassTo.find((dDate) => isSameDay(dDate, date))) {
  //       return 'unavailable';
  //     }
  //   }
  // }

  // async function getWeather(day) {
  //   await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london/${day.toISOString().split('T')[0]}?unitGroup=metric&include=days&key=BQ886JAS7TD7RNBNA8DW9JENC&contentType=json`, {
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //       setWeather(response.data.days[0].tempmax);
  //     });
  // }

  function onChange(nextValue) {
    // const nextDay = new Date(nextValue.getTime() + (1000 * 3600 * 24));
    setValue(nextValue);
    // getWeather(nextDay);
  }

  function tileDisabled({ date, view }) {
    // Disable tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of disabled dates
      return disabledDates.find((dDate) => isSameDay(dDate, date));
    }
  }

  async function submitEvent(event) {
    event.preventDefault();
    const response = await axios.post('http://localhost:8282/appointments/new', {
      date: new Date(value),
      name,
      user_id: userId,
    });

    const { data } = response;

    console.log(data);

    getAppointments();
    setName('');
  }

  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
        tileDisabled={tileDisabled}
        // tileContent={tileContent}
        // tileClassName={tileClassName}
      />
      <p className="text-center">
        <span className="bold">Selected Date:</span>
        {' '}
        {value.toDateString()}
      </p>
      <p>
        {/* {weather} */}
      </p>
      <form onSubmit={submitEvent}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="event" />
        <input type="submit" value="Submit" />
      </form>
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}
      >
        Log out
      </button>
    </>
  );
}

export default GroupCalendar;
