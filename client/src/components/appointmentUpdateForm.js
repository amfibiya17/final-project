import React, { useState } from 'react';
import axios from 'axios';

function AppointmentUpdateForm({ appointment }) {
  const [name, setName] = useState(appointment.name);
  const [date, setDate] = useState(new Date(appointment.date).getTime() + 1000 * 3600);

  async function submitEvent() {
    await axios.patch('http://localhost:8282/appointments/update', {
        eventId : appointment._id,
        date: new Date(new Date(date).getTime() - 1000 * 3600),
        name,
      });
  }

  return (
    <>
      <form onSubmit={submitEvent}>
        <input disabled={!name} data-cy="submit" type="submit" value="Update appointment" />
        <input
          type="date"
          value={new Date(date).toISOString().split('T')[0]}
          onChange={(e) => setDate(e.target.value)}
          data-cy="update-date"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-cy="update-text"
        />
      </form>
    </>
  );
}

export default AppointmentUpdateForm;