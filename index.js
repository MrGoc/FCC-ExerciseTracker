const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { User } = require("./users.js");
require("dotenv").config();
const createUser = require("./users.js").createUser;
const getUsers = require("./users.js").getUsers;

app.use(cors());
app.use(express.static("public"));
// Middleware for parsing body
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", (req, res) => {
  res.json(createUser(req.body.username));
});

app.get("/api/users", (req, res) => {
  let users = getUsers();
  users.then((usrs) => {
    res.json(usrs);
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
