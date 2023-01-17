import React from "react";
import { Availability } from "../data/availability";
import { DateTime } from "luxon";
import styles from "./calendar.module.css";

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

  const availabilityTimeFormat = 'yyyyMMddHH';

  const weekStartTime = dt.startOf('week');
  console.log(weekStartTime.toUTC().toFormat(availabilityTimeFormat));
  // const weekStartTimeStr = parseInt(weekStart.toUTC().toFormat(availabilityTimeFormat));

  // build calendar object
  let weekTimes: {[key: number]: string} = {};

  // loop hours, if break down to 15 mins, this logic need to update
  for (let t = 0; t < 168; t++) {
    console.log(`t: ${t}`)
    const timeString = weekStartTime.plus({ hours: t }).toFormat(availabilityTimeFormat);

    console.log(`timeString: ${timeString}`)

    const availabilityStatus = availability[timeString] ?? 'n';
    console.log(availabilityStatus);
    weekTimes[timeString] = availabilityStatus;
  }

  /**
   * display the calendar
   * Because this is a highly customized table then I just use pure html table
   */
  return <div>
    <h2>Availability Calendar</h2>
    {JSON.stringify(availability)}
    {JSON.stringify(weekTimes)}
    <table className={styles.table}>
      <th>
        <td>Mon</td>
        <td>Tue</td>
        <td>Wed</td>
        <td>Thu</td>
        <td>Fri</td>
        <td>Sat</td>
        <td>Sun</td>
      </th>

    </table>
    </div>
}

export default Calendar;
