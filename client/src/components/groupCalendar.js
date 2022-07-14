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
import Navbar from './navbar';
import Modal from './modal';

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
  const [isOpen, setIsOpen] = useState(false);
  const [weatherTempMax, setWeatherTempMax] = useState();
  const [weatherTempMin, setWeatherTempMin] = useState();
  const [weatherConditions, setWeatherConditions] = useState();
  const [weatherIcon, setWeatherIcon] = useState();

  function getAppointments() {
    if (userId) {
      axios
        .get('http://localhost:8282/appointments/calendar', {
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
    await axios
      .get('http://localhost:8282/users/userId', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setUserId(response.data.user_id);
        setUserArray(response.data.user_id);
      });
  }

  async function getAllUsers() {
    if (userId) {
      await axios
        .get('http://localhost:8282/users/all', {
          params: {
            user_id: userId,
          },
        })
        .then((response) => {
          setUsersAll(response.data);
        });
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      getUserId();
      // getAllUsers();
    }
  }, []);

  useEffect(() => {
    setUserArray([userId]);
    getAppointments();
    getAllUsers();
  }, [userId]);

  // useEffect(() => {
  //   getAppointments();
  // }, [userArray]);

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

  async function getWeather(day) {
    await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london/${day.toISOString().split('T')[0]}?unitGroup=metric&include=days&key=BQ886JAS7TD7RNBNA8DW9JENC&contentType=json`, {
    })
      .then((response) => {
        setWeatherTempMax(response.data.days[0].tempmax);
        setWeatherTempMin(response.data.days[0].tempmin);
        setWeatherConditions(response.data.days[0].conditions);
        setWeatherIcon(`./images/weather/${response.data.days[0].icon}.png`);
      });
  }

  function onChange(nextValue) {
    const nextDay = new Date(nextValue.getTime() + (1000 * 3600 * 24));
    setValue(nextValue);
    getWeather(nextDay);
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
    let response;
    try {
      response = await axios.post('http://localhost:8282/appointments/new', {
        date: new Date(value),
        name,
        user_id: userArray,
      });
    } catch (err) {
      setIsOpen(false);
    } finally {
      if (response) {
        setIsOpen(true);
      }
      setName('');
    }
    // const { data } = response;
  }

  function addingUser(newUser) {
    const auxArray = userArray;
    if (auxArray.includes(newUser)) {
      const index = auxArray.indexOf(newUser);
      auxArray.splice(index, 1);
      setUserArray(auxArray);
      getAppointments();
    } else {
      auxArray.push(newUser);
      setUserArray(auxArray);
      getAppointments();
    }
  }

  return (
    <>
      <Navbar />
      <Calendar
        onChange={onChange}
        value={value}
        tileDisabled={tileDisabled}
        // tileContent={tileContent}
        // tileClassName={tileClassName}
      />
      <p className="text-center" data-testid="selected-date">
        <span className="bold">Selected Date:</span>
        {' '}
        {value.toDateString()}
      </p>
      <div data-testid="date-info" className="weather">
        <p className="maxT">
          MaxT:
          {' '}
          { weatherTempMax }
          {' '}
          C
        </p>
        <p className="minT">
          MinT:
          {' '}
          { weatherTempMin }
          {' '}
          C
        </p>
        <p className="conditions">
          Weather:
          {' '}
          { weatherConditions }
        </p>
        <p className="icon">
          <img src={weatherIcon} alt="" />
        </p>
      </div>
      <ul>
        {usersAll.map((user, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={i}>
            <input
              type="checkbox"
              data-testid="checkbox"
              data-cy="checkbox"
              onChange={() => {
                // eslint-disable-next-line no-underscore-dangle
                addingUser(user._id);
              }}
            />
            {user.name}
          </li>
        ))}
      </ul>
      <form onSubmit={submitEvent}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="event"
        />
        <input disabled={!name} type="submit" data-cy="submit-group-event" value="Submit" onClick={() => setIsOpen(true)} />
      </form>
      <div>
        <Modal open={isOpen} onClose={() => navigate('/home')}>
          Event Added
        </Modal>
      </div>
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
