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
  let availability = props.availability;

  // get the week from year and week number
  const dt = DateTime.fromObject({
    weekYear: year,
    weekNumber: weekNumber
  });

  // this should be defined in a global file and shared between functions or even projects
  enum weekdayShortName {
    Mon = 'Mon',
    Tue = 'Tue',
    Wed = 'Wed',
    Thu = 'Thu',
    Fri = 'Fri',
    Sat = 'Sat',
    Sun = 'Sun'
  };

  const availabilityTimeFormat = 'yyyyMMddHH';
  const weekStartTime = dt.startOf('week');

  type WeekCalendarList = {
    [key: string]: {
      [key: string]: {
        timeString: string;
        availability: string;
      }
    }
  }
  // build calendar object
  let weekCalendarData: WeekCalendarList = {};

  // loop hours, if break down to 15 mins, this logic need to update
  for (let t = 0; t < 168; t++) {
    const newTime = weekStartTime.plus({ hours: t });
    const timeString = newTime.toFormat(availabilityTimeFormat);

    const availabilityStatus = availability[timeString] ?? 'n';

    // init the first level objects
    if (weekCalendarData[newTime.hour.toString()] === undefined) {
      weekCalendarData[newTime.hour.toString()] = {};
    }
    // add value to the calendar object
    weekCalendarData[newTime.hour.toString()][newTime.weekday.toString()] = {
      timeString,
      availability: availabilityStatus
    };
  }

  const getStatusClassName = (availabilityString: string): string => {
    switch (availabilityString) {
      case 'y':
        return styles.green;
      case 'booked':
        return styles.red
      default:
        return '';
    }
  }

  /**
   * display the calendar
   * Because this is a highly customized table then I just use pure html table
   */
  return <div>
    <h2>Availability Calendar</h2>
    <table className={styles.table}>
      <tr>
        <td className={styles['time-indicator']}></td>
        {Object.values(weekdayShortName).map(dayName => {
          return <th>{dayName}</th>;
        })}
      </tr>
      {
        Object.values(weekCalendarData).map((value, index) => {
          // Could use loop here to save coding, but I feels this is more clear and UI might have different design on weekdays
          return <tr>
            {
              [...Array(8)].map((x, i) => {
                if (i === 0) {
                  // display hourly time at the most left of the table for user
                  return (<td className={styles['time-indicator']}>
                      <div className={styles['time-indicator-div']}>{value[(i+1).toString()].timeString.slice(-2)}</div>
                    </td>);
                } else {
                  return <td className={getStatusClassName(value[(i).toString()].availability)}>
                      {value[(i).toString()].timeString}
                    </td>;
                }
              })
            }
          </tr>
        })
      }
    </table>
    </div>
}

export default Calendar;
