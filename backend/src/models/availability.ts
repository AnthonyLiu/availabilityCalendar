import sequelize from "./db-connection";
import { DataTypes } from "sequelize";

export type Availability = {
  [key: string]: 'y' | 'n' | 'booked' // TODO: this value might only need 'y' or 'booked', this is debatable to have a better value
}

// multiple-column PRIMARY KEY, means a user have only one record for each week in a year
const AvailabilityModel = sequelize.define("Availabilities", {
  userId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  year: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  weekNumber: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  availability: DataTypes.JSON
})

AvailabilityModel.sync();

// This could be abstracted to another layer. I just leave it here for this demo.
export interface IAvailabilityModel {
  create(userId: string, year: number, weekNumber: number, availability: Availability): Promise<boolean>;
  get(userId: string, year: number, weekNumber: number): Availability;
  update(userId: string, year:number, weekNumber: number, availability: Availability): boolean;
}

export const create = async (userId: string, year: number, weekNumber: number, availability: Availability): Promise<boolean> => {
  let isSuccess: boolean; // This is a little bit raw, should be improved later
  /**
   * There should be user table, it's required to valid if the userId is existing in DB, this foreign key validation should be in model level
   * Validation of year, week and availability should be in route, which includes business level logic
   */
  await AvailabilityModel.create({
    userId,
    year,
    weekNumber,
    availability
  }).then((record) => {
    // should use a proper multi level logger
    /* tslint:disable-next-line no-console*/
    console.log(`Availability created: ${JSON.stringify(record)}`)
    isSuccess = true;
  }).catch((err) => {
    // should use a proper multi level logger
    /* tslint:disable-next-line no-console*/
    console.log(`Availability create error: ${err}`)
    isSuccess = false;
  })

  return isSuccess;
}

export const get = (userId: string, year: number, weekNumber: number) => {
  return {};
}

export const update = (userId: string, year: number, weekNumber: number, availability: Availability) => {
  return true;
}