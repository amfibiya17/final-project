/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns';
import './personalCalendar.css';
import './groupCalendar.css';
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
    if (userId) {
      await axios.get('http://localhost:8282/users/all', {
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
    let response;
    try {
      response = await axios.post('http://localhost:8282/appointments/new', {
        date: new Date(value),
        name,
        user_id: userArray,
      });
    } finally {
      if (response) {
        alert(`${name} is booked in`);
        navigate('/home');
      } else {
        alert('try again... muhahahah');
      }
      getAppointments();
      setName('');
    }
    // const { data } = response;
  }

  function addingUser(newUser) {
    const auxArray = userArray;
    if (auxArray.includes(newUser)) {
      const index = auxArray.indexOf(newUser);
      auxArray.splice(index, 1);
      console.log(auxArray);
      setUserArray(auxArray);
      getAppointments();
    } else {
      auxArray.push(newUser);
      console.log(auxArray);
      setUserArray(auxArray);
      getAppointments();
    }
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
      <div className="groupEventUsers">
        <div>Add participants:</div>
        <div className="scrollbox">
          {usersAll.map((user, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i}>
              <input
                type="checkbox"
                onChange={() => {
                  // eslint-disable-next-line no-underscore-dangle
                  addingUser(user._id);
                }}
              />
              {user.name}
            </div>
          ))}
        </div>
      </div>
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
