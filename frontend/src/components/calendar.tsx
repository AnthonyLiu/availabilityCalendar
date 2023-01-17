import React from "react";
import { Availability } from '../data/availability';
import { DateTime } from "luxon";

type CalendarProps = {
  year: string;
  weekNumber: string;
  availability: Availability;
};

const Calendar = (props: CalendarProps) => {
  const year = parseInt(props.year);
  const weekNumber = parseInt(props.weekNumber);
  const availability = props.availability;

  // get the week from year and week number
  const dt = DateTime.fromObject({
    weekYear: year,
    weekNumber: weekNumber
  });

  const weekStart = dt.startOf('week');
  console.log(weekStart)

  // display the calendar
  return <div>
    <h2>Availability Calendar</h2>
    {JSON.stringify(availability)}
    </div>
}

export default Calendar;
