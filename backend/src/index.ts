import express from "express";
const app = express();
const port = 3007; // server port

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Sample response");
});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});