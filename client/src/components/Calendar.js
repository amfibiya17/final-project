/* eslint-disable camelcase */
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

import './custom.css';

function Calendar() {
  const [appointments, setAppointments] = useState([]);
  (async () => {
    const user_id = '62c6139c9c28b952c0b65659';
    const response = await fetch(`http://localhost:4000/appointments/calendar?user_id=${user_id}`);
    const records = await response.json();

    setAppointments(records.map((record) => ({
      title: record.name,
      date: new Date(record.date),
    })));
  })();

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        events={appointments}
      />
    </div>
  );
}

export default Calendar;
