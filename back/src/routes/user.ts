import { Router } from "express";
import { StringToColour } from "../model/Colour";
import { createUser } from "../model/User";
import Users from "../model/Users";

interface PostData {
  name: string;
  message?: string;
  colour?: string;
}

const createUserRoute = (data: Users) => {
  const userRoute = Router();

  //create
  userRoute.post("/", async (req, res) => {
    const { name, message, colour } = req.body as PostData;
    if (name) {
      const newUser = createUser(name);
      if (message) {
        newUser.status.message = message;
      }
      if (colour) {
        const foo = new StringToColour();
        const key = colour as keyof StringToColour;
        newUser.status.colour = foo[key];
      }
      data.push(newUser);
      res.json(newUser);
    } else {
      res.sendStatus(400);
    }
  });
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
  });
  //update
  //delete
  userRoute.delete("/", (req, res) => {
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
  });
  return userRoute;
};
export default createUserRoute;
