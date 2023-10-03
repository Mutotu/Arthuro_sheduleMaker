import React from 'react';
import saveScheduleToCSV from "./csvWriter"

function ShiftTable({ schedule }) {
  const days = Object.keys(schedule);
  const shifts = ["0600-1400", "1400-2200", "2200-0600"];

  const currentDate = new Date();

  // Calculate the date for each day of the week
  const dateLabels = days.map((day, index) => {
    const dayOffset = (index - currentDate.getDay() + 7) % 7;
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + dayOffset);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
    return formattedDate;
  });

  const handleClick = () => {
    saveScheduleToCSV(schedule)
  }
  return (
    <div className="shift-table">
      <h2>Schedule</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            {days.map((day, index) => (
              <th key={day}>
                {day} <br /> {dateLabels[index]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shifts.map(shift => (
            <tr key={shift}>
              <td>{shift}</td>
              {days.map(day => (
                <td key={`${day}-${shift}`}>{schedule[day][shift].length === 0 ? <input value={"temp"} /> : schedule[day][shift]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleClick}>Save to csv</button>
    </div>
  );
}

export default ShiftTable;
