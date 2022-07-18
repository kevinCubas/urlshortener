import express, { Request, Response, urlencoded } from "express";
import { URLcontroller } from "./controller/URLcontroller";
import { MongoConnection } from "./database/MongoConnection";

const app = express();

app.use(express.json())

const database = new MongoConnection();
database.connect();

const urlController = new URLcontroller();
app.post("/shorten", urlController.shorten);

app.get('/:hash', urlController.redirect)

app.listen(3333, () => {
  console.log("Listening at 3333 port")
});