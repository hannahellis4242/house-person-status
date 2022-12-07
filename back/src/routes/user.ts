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
  console.log("data :", data);
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
  const { id } = req.query;
  if (id) {
    await client.connect();
    const db = client.db("notice-board");
    const collection = db.collection("notes");
    const value = await collection.findOne({ _id: new ObjectId(id as string) });
    client.close();
    if (value) {
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
