/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns';
import './personalCalendar.css';
// import './reactCal.css';
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

  async function getWeather(day) {
    await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london/${day.toISOString().split('T')[0]}?unitGroup=metric&include=days&key=SZLE9LUXLBZ7XMZGCYRKPGJWV&contentType=json`, {
    })
      .then((response) => {
        setWeatherTempMax(response.data.days[0].tempmax.toFixed(0));
        setWeatherTempMin(response.data.days[0].tempmin.toFixed(0));
        setWeatherConditions(response.data.days[0].conditions);
        setWeatherIcon(`./images/weather/${response.data.days[0].icon}.png`);
      });
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
      getWeather(value);
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
      <div className="nav-center">
        <Navbar />
      </div>
      <div className="calbody">
        <div className="center-element">
          <div className="center-child">
            <div className="header-buffer">
              <div className="greeting">
                What do you have in mind?
              </div>
              <div className="greeting1">
                Coordinate your next group event:
              </div>
            </div>
            <Calendar
              onChange={onChange}
              value={value}
              tileDisabled={tileDisabled}
              // tileContent={tileContent}
              // tileClassName={tileClassName}
            />
            {/* {user.name}
              </li>
            ))} */}
            <div className="group-select-body">
              <div className="group-select-section">
                <div data-testid="date-info" className="temperature">
                  <div>
                    Max Temp:
                    {' '}
                    { weatherTempMax }
                    ºC
                  </div>

                  <div>
                    Min Temp:
                    {' '}
                    { weatherTempMin }
                    ºC
                  </div>
                </div>

                <div className="conditions">
                  {/* Weather:
                  {' '} */}
                  { weatherConditions }
                  {'   '}
                  <img src={weatherIcon} alt="" className="icon" />
                </div>
              </div>
              <div className="group-select-section">
                <div className="selected-text" data-testid="selected-date">
                  <span className="current-date-select">Selected Date:</span>
                  <br />
                  <span className="current-date-select">{value.toDateString()}</span>
                </div>
                <form className="submit-form" onSubmit={submitEvent}>
                  <input
                    className="input-evnt"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Create event"
                  />
                  <input className="input-bttn" disabled={!name} type="submit" data-cy="submit-group-event" value="Submit" onClick={() => setIsOpen(true)} />
                </form>
                <div>
                  <Modal open={isOpen} onClose={() => navigate('/home')}>
                    Event Added
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          <div className="center-child1">
            <div className="header-buffer" />
            <div className="user-scroll">
              <ul>
                {usersAll.map((user, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li className="user-scroll-list" key={i}>
                    <input
                      className="checkbox"
                      type="checkbox"
                      data-testid="checkbox"
                      data-cy="checkbox"
                      onChange={() => {
                        // eslint-disable-next-line no-underscore-dangle
                        addingUser(user._id);
                      }}
                    />
                    <div className="user-scroll-name">{user.name}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GroupCalendar;
