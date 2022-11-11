import axios from "axios";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { configure } from "nunjucks";

var app = express();

configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", function (req, res) {
  axios
    .get("/user")
    .then((data) => res.render("index.html", { items: ["a", "b", "c"] }))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

app.use("/user", createProxyMiddleware({ target: "http://localhost:3000" }));

app.listen(8080, () => console.log("running"));
