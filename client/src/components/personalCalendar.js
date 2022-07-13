/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns';
// import './personalCalendar.css';
import './reactCal.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

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
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const [datesToAddClassTo, setDatesToAddClassTo] = useState([]);
  const [name, setName] = useState('');
  const [appointmentsArray, setAppointmentsArray] = useState([]);
  const [appointmentName, setAppointmentName] = useState('');
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [weatherTempMax, setWeatherTempMax] = useState();
  const [weatherTempMin, setWeatherTempMin] = useState();
  const [weatherConditions, setWeatherConditions] = useState();
  const [weatherIcon, setWeatherIcon] = useState();

  function getAppointments() {
    if (userId) {
      axios
        .get('http://localhost:8282/appointments/calendar', {
          params: {
            user_id: userId,
          },
        })
        .then((response) => {
          setAppointmentsArray(response.data);
          const data = [];
          response.data.forEach((appointment) => {
            data.push(new Date(appointment.date));
          });
          setDatesToAddClassTo(data);
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
        setUserName(response.data.name);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      getUserId();
    }
  }, []);

  useEffect(() => {
    getAppointments();
  }, [userId]);

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

  function appointmentInformation(selectedDate) {
    let a = 0;
    appointmentsArray.forEach((appointment) => {
      // eslint-disable-next-line eqeqeq
      if (
        new Date(appointment.date).toDateString() === new Date(selectedDate).toDateString()
      ) {
        setAppointmentName(appointment.name);
        a = 1;
      }
    });
    if (a === 0) {
      setAppointmentName('');
    }
  }

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
    appointmentInformation(nextValue);
    getWeather(nextDay);
  }

  async function submitEvent(event) {
    event.preventDefault();
    const response = await axios.post(
      'http://localhost:8282/appointments/new',
      {
        date: new Date(value),
        name,
        user_id: userId,
      },
    );

    if (response) {
      setSuccess(`${name} has been added to your calendar!`);
      setError(null);
    } else {
      setError('There was an error in your request. Please try again.');
      setSuccess(null);
    }
    getAppointments();
    setName('');
  }

  async function deleteEvent(eventId, eventUsersId) {
    if (eventUsersId.length <= 2) {
      await axios.delete(
        'http://localhost:8282/appointments/delete',
        {
          params: {
            eventId,
          },
        },
      );
    } else {
      await axios.patch(
        'http://localhost:8282/appointments/remove_user',
        {
          eventId,
          userId,
        },
      );
    }
    getAppointments();
  }

  return (
    <>
      <div className="nav-center">
        <Navbar />
      </div>
      <div className="calbody">
        <div className="center-element">
          <div className="center-child">
            <div className="calbox">
              <div className="greeting">
                Hi
                {' '}
                {userName}
                ,
              </div>
            </div>
            <div className="calbox">
              <div className="greeting1">
                this is your personal Calendar
              </div>
            </div>

            <Calendar
              // className="calbody"
              onChange={onChange}
              value={value}
              // tileDisabled={tileDisabled}
              // tileContent={tileContent}
              tileClassName={tileClassName}
            />

            <div className="select-body">

              <div className="text-center">
                <span className="bold">Selected Date: </span>
                {value.toDateString()}
                {'   '}
                {appointmentName}
              </div>

              <div className="weather">

                <div className="temperature">
                  <div>
                    Max Temp:
                    {' '}
                    { weatherTempMax }
                    {' '}
                    C
                  </div>

                  <div>
                    Min Temp:
                    {' '}
                    { weatherTempMin }
                    {' '}
                    C
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

              <form onSubmit={submitEvent}>
                <input className="input-event" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Create event" />
                <input className="input-button" disabled={!name} type="submit" data-cy="submit" value="Submit" />
              </form>

              {error && <div className="error">{error}</div>}
              {success && <div className="success">{success}</div>}

            </div>
          </div>

          <div className="center-child1">
            <div className="calbox" />
            <div className="greeting" />
            <div className="greeting2">your upcoming appointments</div>
            <div className="appointmentscroll">
              <ul>
                {appointmentsArray
                  .filter((appointment) => new Date(new Date(appointment.date)
                    .getTime() + (1000 * 3600 * 20)) >= new Date())
                  .map((appointment, index) => (
                    <li className="scroll-list" key={index}>
                      <div className="appointment-overview">
                        <span className="scroll-date">
                          {new Date(appointment.date).toLocaleDateString()}
                        </span>
                          &ensp;
                        <span>
                          {appointment.name}
                          &ensp;
                        </span>
                        {appointment.user_id.map((user, i) => (
                          <span key={i}>
                            {user.name}
                          &ensp;
                          </span>
                        ))}

                        <button
                          className="delete-button"
                          type="submit"
                          onClick={() => {
                            // eslint-disable-next-line no-underscore-dangle
                            deleteEvent(appointment._id, appointment.user_id);
                          }}
                        >
                          delete
                        </button>
                      </div>
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

export default PersonalCalendar;
