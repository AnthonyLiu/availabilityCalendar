import { Sequelize, Dialect } from "sequelize";

/**
 * The DB credential should be store in a secure way, eg. in aws parameter store or env
 */
const settings = {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql" as Dialect,
  define: {
    timestamps: false
  }
}

const sequelize = new Sequelize("mydb", "user", "user", settings);

sequelize
  .authenticate()
  .then(() => {
    /* tslint:disable-next-line no-console*/
    console.log('Connected successfully.'); // here should use a proper logger, just use console in demo
  })
  .catch((err) => {
    /* tslint:disable-next-line no-console*/
    console.log('Unable to connect to the database:', err);
  });

export default sequelize;