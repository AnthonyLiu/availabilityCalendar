import express from "express";
import dotenv from "dotenv";
import { MainRouter } from './routes';

// initialize configs
dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();


// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

app.use(express.json());

app.use('/api', MainRouter);