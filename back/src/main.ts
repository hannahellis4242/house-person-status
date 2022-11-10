import express, { json } from "express";
import Users from "./model/Users";
import createUserRoute from "./routes/user";

const userData: Users = [];

const app = express();
app.use(json());

app.use("/user", createUserRoute(userData));

app.listen(3000, () => console.log("running"));
