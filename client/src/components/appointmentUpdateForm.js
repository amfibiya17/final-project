import React, { useState } from 'react';

function AppointmentUpdateForm({ appointment }) {
  const [name, setName] = useState(appointment.name);
  const [date, setDate] = useState(appointment.date);

  return (
    <>
      <form onSubmit={submitEvent}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input disabled={!name} data-cy="submit" type="submit" value="Update appointment" />
      </form>
    </>
  );
}

export default AppointmentUpdateForm;