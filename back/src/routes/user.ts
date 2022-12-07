import { Router } from "express";
import { MongoClient, ObjectId } from "mongodb";

const dbHost = process.env.DB_HOST || "localhost";
const url = `mongodb://${dbHost}:27017`;
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
  if (data) {
    await client.connect();
    const db = client.db("notice-board");
    const collection = db.collection("notes");
    const value = await collection.insertOne(data);
    client.close();
    res.json(value.insertedId);
  } else {
    res.sendStatus(400);
  }
});

//read
userRoute.get("/", async (req, res) => {
  const { id, ...data } = req.query;
  if (id) {
    await client.connect();
    const db = client.db("notice-board");
    const collection = db.collection("notes");
    const value = await collection
      .find({ _id: new ObjectId(id as string) })
      .toArray();
    client.close();
    if (value) {
      res.json(value);
    } else {
      res.sendStatus(404);
    }
  } else if (data) {
    await client.connect();
    const db = client.db("notice-board");
    const collection = db.collection("notes");
    const value = await collection.find(data).toArray();
    client.close();
    if (value.length !== 0) {
      res.json(value);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});
//update
//delete
userRoute.delete("/", async (req, res) => {
  const { id } = req.body;
  if (id) {
    await client.connect();
    const db = client.db("notice-board");
    const collection = db.collection("notes");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    client.close();
    res.sendStatus(result.deletedCount !== 0 ? 200 : 404);
  } else {
    res.sendStatus(400);
  }
});
export default userRoute;
