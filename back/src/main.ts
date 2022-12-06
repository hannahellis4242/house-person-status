import express, { json } from "express";
import userRoute from "./routes/user";

const app = express();
app.use(json());

app.use("/user", userRoute);

app.listen(3000, () => console.log("running"));
