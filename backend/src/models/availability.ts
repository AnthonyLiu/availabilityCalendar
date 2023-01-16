export type Availability = {
  [key: string]: 'y' | 'n' | 'booked' // TODO: this value might only need 'y' or 'booked'
}

export interface IAvailabilityModel {
  create(id: string, weekNumber: number, availability: Availability): boolean;
}

export const create = (userId: string, weekNumber: number, availability: Availability) => {
  // TODO: validate if user id is correct
  // TODO: validate if weekNumber is valid, eg. throw error if it's larger than 52
  // TODO: validate if this user had a availability
  // TODO: create a record in DB
  return true;
}

export const update = (userId: string, weekNumber: number, availability: Availability) => {
  // TODO: validate if user id is correct
  // TODO: validate if weekNumber is valid, eg. throw error if it's larger than 52
  // TODO: update the record in DB
  return true;
}