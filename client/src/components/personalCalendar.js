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
  // const [weather, setWeather] = useState();

  function getAppointments() {
    if (userId) {
      axios
        .get(`http://localhost:${process.env.PORT}/appointments/calendar`, {
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
      .get(`http://localhost:${process.env.PORT}/users/userId`, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setUserId(response.data);
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
    appointmentInformation(nextValue);
    // getWeather(nextDay);
  }

  async function submitEvent(event) {
    event.preventDefault();
    const response = await axios.post(
      `http://localhost:${process.env.PORT}/appointments/new`,
      {
        date: new Date(value),
        name,
        user_id: userId,
      },
    );

    if (response) {
      alert(`${name} is booked in`);
    } else {
      alert('try again... muhahahah');
    }
    getAppointments();
    setName('');
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
      <p className="text-center" data-testid="selected-date">
        <span className="bold">Selected Date:</span>
        {value.toDateString()}
      </p>
      <p data-testid="date-info">
        {appointmentName}
        {/* {weather} */}
      </p>
      <form onSubmit={submitEvent}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="event" />
        <input type="submit" data-cy="submit" value="Submit" />
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
      <button
        type="button"
        onClick={() => {
          navigate('/group_event');
        }}
      >
        Create group event
      </button>
    </>
  );
}

export default PersonalCalendar;
