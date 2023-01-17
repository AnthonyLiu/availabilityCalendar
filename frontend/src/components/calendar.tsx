import React from "react";
import { Availability } from '../data/availability';

type CalendarProps = {
  availability: Availability
};

const Calendar = (props: CalendarProps) => {
  const availability = props.availability;

  return <div>
    <h2>Availability Calendar</h2>
    {JSON.stringify(availability)}
    </div>
}

export default Calendar;
