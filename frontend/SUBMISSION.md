## Overview Design
This would be a sample react app for displaying availability of Guide.
I am planning to display in a calendar like table, which has 7 data columns for each day of the week. The left row header would list hours from 00 to 24.
Each cell contains a value which represent that time period, eg. 2023010109, represent the hour between 9:00 am to 10:00 am.

The default background is white,, which means it doesn't have information. Eg. no availability, not booked.
If the guide selected it as it available, eg.
```
  availability: {
    "2023010109": "y",
  }
```
then it will display as green.

All selections would store in a state for frontend only.
It's need a button to submit the selection (availability object) to API.


## Answers For Bonus Points
* Can you render a Guide's availability in some sort of calendar-like presentation?
Designed as calendar like table. In next step, user could selected their available time by clicking or dragging and releasing.

* Can a Guide reduce or expand their availability via the above presentation?
Yes, the user could click any cells to switch the color between white (unavailable) and green (available)
While considering the app support booking in future, the booked time, eg,
```
  availability: {
    "2023010109": "booked",
  }
```
might display as red, which we might don't allow user click to change it to white (unavailable).

* Can you encourage a Guide to take a break and stretch their legs, to break up long periods?
This could be implemented on calculation in useEffect. While user select a time to green (available). Summing the previous times and following times, then check if the total period is longer that a threshold (eg, 3 hours).