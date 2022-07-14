import React, { useState } from 'react';
import axios from 'axios';
import './appointmentUpdateForm.css'

function AppointmentUpdateForm({ appointment }) {
  const [name, setName] = useState(appointment.name);
  const [date, setDate] = useState(new Date(appointment.date).getTime() + 1000 * 3600);

  async function submitEvent() {
    await axios.patch('http://localhost:8282/appointments/update', {
      eventId: appointment._id,
      date: new Date(new Date(date).getTime() - 1000 * 3600),
      name,
    });
  }

  return (
    <div>
      <form onSubmit={submitEvent}>

        <input
          className="input-date"
          type="date"
          value={new Date(date).toISOString().split('T')[0]}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          className="input-event"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input className="input-button"
          disabled={!name}
          data-cy="submit"
          type="submit"
          value="Update appointment"
        />

      </form>
    </div>
  );
}

export default AppointmentUpdateForm;
