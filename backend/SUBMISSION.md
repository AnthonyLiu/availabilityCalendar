## Overview Design
Initially, I was thinking to use {from: value, to: value} as the data format for this availability API. But I rejected this design because the following reasons,\
1, One of the good point using {from-to} is flexibility, the user could submit any time frame event for seconds. But in the realistic scenarios, rare users need to select a time range for seconds or even minutes.\
2, {from-to} format is hard to support booking in the next step of this API, eg, booking. While the customer booking the middle range of the available range, the code need to chop the range to two ranges.\
3, This format have low performance while there are a lot for bookings and cancellations.


What data format I choose is, time period JSON object, a sample data would be
```
{
  availability: {
    "2023010100": "y", // this is an sample, which I used hourly period, eg. here means the Guide is available from 2023-Jan-01, 00 am to 01 am ('y' means available)
    "2023010101": "y",
    ...
  }
}
```
The reasons are,\
1, a time period is good enough for the Guide shows their availability\
2, it's easy to do book and cancel actions in future\
3, Customer could still book any time for a Guide, no limitation\
4, technically, it could break to minutes, seconds or even milliseconds, but the cost would be increased geometrically. In realistic scenarios, I think 15 mins is already good enough. Then the equivalent sample data from above would like this,\
```
{
  availability: {
    "202301010000": "y",
    "202301010015": "y",
    "202301010030": "y",
    "202301010045": "y",
    "202301010100": "y",
    "202301010115": "y",
    "202301010130": "y",
    "202301010145": "y",
    ...
  }
}
```

The shortcoming of this data format is,\
1, it cost more on data storage and data transfer\
  a, consider current data storage cost, I don't think it's a concern\
  b, data transfer is not a big issue, because it's still limit for a given week. Also, we still could improve it but optimization\
2, if in the next step, the api support a customer to book any time, this data structure could not store the accurate availability.\
  eg. if user booked time start from 'xxxxxxxx0014', we still need to mark 'xxxxxxxx0000' as unavailable, but\
  a, I don't think that's a big issue\
  b, the UI could limit the user to book only full hours or 15 mins

* In database, even I stored the week number, I still prefer to use full utc time, eg, yyyymmddhh. It's much better to do timezone work for a global app.

As my data format design, I would choose NoSQL DB For data storage, eg. dynamoDB.\
For time frame, I would use mysql for demo.\

## Discussion on the Request Payload
For the API payload, I am not sure whether I could change it or not. This is the request format
```
For submitting availability:

{
  "userId": 123456,
  "weekNumber": 1,
  "availability": "up to you"
}
For retrieving a Guide's availability:

{
  "userId": 123456
}
```
Here are some my personal opinions,\
1, add 'year' in the submitting API (POST), eg. the Guide might want to set availability for the next year while in the end of the year\
2, moving 'userId' in the url is more restful, it's better if the API might open to third parties.\
3, we could keep 'year' and 'weekNumber' in the payload, for the reason the API might support multiple weeks, but the payload format need to updated\
4, in retrieving API (get), might move 'userId' to url too. And make 'year', 'weekNumber' as mandatory payload. Because we don't want user request all the availability, this doesn't make sense and cost more on server if we don't delete the expired availability.\
* These url parameters are only good if there are restful API and the API is potentially open to others. If this is a backend for frontend (BFF) layer and using GraphQL, no need change 'userId' to the url parameter\

## Answers For Bonus Points
For bonus points, consider tackling one or more of these complications:
* Can you limit submissions to occur within certain hours? Such as 7am-10pm?\
Yes, I could do this by time comparison with luxon (time lib)
But, this should only limit in frontend, not in API, because of the timezone issue. eg, user who are living in US, but he want to select an availability while travelling in Australia. That's the reason I choose to always store UTC time in database.

* Can you encourage a Guide to take a break and stretch their legs, to break up long periods?\
Yes, this could be done by checking the availability periods, eg. if we want to recommend a break for two hours and there are consecutive periods are selected, we display a message to the user. Similar to the above one, this should implement in frontend

* Can you write an additional API allowing users to book some time with a Guide, making the Guide no longer available.\
Yes, while a customer book a time, save this as an event ({from, to} format), and break down the event time period into an object of the availability periods. Then update the user's availability periods object in DB.