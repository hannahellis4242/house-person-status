import { Router } from "express";
import { MongoClient } from "mongodb";

const url = "mongodb://db:27017";
const client = new MongoClient(url);

interface PostData {
  name?: string;
  message?: string;
  colour?: string;
  x?: number;
  y?: number;
  z?: number;
}
const userRoute = Router();

//create
userRoute.post("/", async (req, res) => {
  const data = req.body as PostData;
  console.log("data :", data);
  if (data) {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("notice-board");
    console.log("database");
    const collection = db.collection("notes");
    console.log("collection");
    const value = await collection.insertOne(data);
    console.log("value : ", value);
    client.close();
    console.log("closed");
    res.json(value.insertedId);
  } else {
    res.sendStatus(400);
  }
});
/*
//read
userRoute.get("/", async (req, res) => {
  const { id, name } = req.query;
  if (id) {
    const value = data.find(({ person }) => id === person.id);
    if (value) {
      res.json(value);
    } else {
      res.sendStatus(404);
    }
  } else if (name) {
    const value = data.find(({ person }) => name === person.name);
    if (value) {
      res.json(value);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.json(data);
  }
});*/
//update
//delete
/*userRoute.delete("/", (req, res) => {
  const { id } = req.body;
  if (id) {
    const item = data.find(({ person }) => id === person.id);
    if (item) {
      data = data.filter((user) => user !== item);
      res.json(item);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});*/
export default userRoute;
