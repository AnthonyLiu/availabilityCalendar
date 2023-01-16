import express from "express";
import dotenv from "dotenv";

// initialize configs
dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Sample response");
});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});