import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/dbConfig';
import router from './Routes/deviceRoutes';
import bodyParser from "body-parser"
import cors from "cors"
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cors())

connectDB().then((result: any) => {
  console.log("Db connected", result)
}).catch((err: any) => {
  console.log(err)
});


app.use("/device", router)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});