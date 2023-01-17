import availability from "./fixtures/availability.json";

export type Availability = {
  [key: string]: 'y' | 'n' | 'booked' // TODO: this value might only need 'y' or 'booked'
}

// data response structure from API
// TODO: this type should sit in a share type folder, which could be used by frontend and backend. Sitting frontend is fine, but using npm package or submodule is better
interface UserAvailability {
  userId: string
  weekNumber: string
  availability: Availability
}


// get data for fronted
export const getAvailabilityByUserAndWeek = (userId: string, weekNumber: string): Availability | string => {
  let responseData: UserAvailability;

  try {
    // TODO: should getting data from the backend API
    responseData = availability as UserAvailability;
    return responseData?.availability;
  } catch (error) {
    // TODO: should use proper error logger
    console.log('Cannot get response from server', error)
    return 'Getting data failed';
  }
}
