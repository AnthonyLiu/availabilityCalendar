export type Availability = {
  [key: string]: 'y' | 'n' | 'booked' // TODO: this value might only need 'y' or 'booked'
}

export interface IAvailabilityModel {
  create(id: string, year:number, weekNumber: number, availability: Availability): boolean;
  get(id: string, year: number, weekNumber: number): Availability;
  update(id: string, year:number, weekNumber: number, availability: Availability): boolean;
}

export const create = (userId: string, year: number, weekNumber: number, availability: Availability) => {
  // TODO: create a record in DB
  return true;
}

export const get = (userId: string, year: number, weekNumber: number) => {
  return {};
}

export const update = (userId: string, year: number, weekNumber: number, availability: Availability) => {
  return true;
}