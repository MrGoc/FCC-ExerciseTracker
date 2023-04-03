const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { User } = require("./users.js");
require("dotenv").config();
const createUser = require("./users.js").createUser;
const getUsers = require("./users.js").getUsers;
const getSingleUser = require("./users.js").getSingleUser;
const createExercise = require("./exercises.js").createExercise;
const getExercises = require("./exercises.js").getExercises;

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

app.post("/api/users/:_id/exercises", (req, res) => {
  let user = getSingleUser(req.params._id);
  user.then((usr) => {
    let exercise = createExercise(
      usr._id,
      req.body.description,
      req.body.duration,
      req.body.date
    );
    res.json({
      _id: usr._id,
      username: usr.username,
      date: exercise.date,
      duration: exercise.duration,
      description: exercise.description,
    });
  });
});

app.get("/api/users/:_id/logs", (req, res) => {
  let myEx = [];
  let user = getSingleUser(req.params._id);
  user.then((usr) => {
    let exercises = getExercises(req.params._id);
    exercises
      .then((ex) => {
        for (let i = 0; i < ex.length; i++) {
          myEx.push({
            description: ex[i].description,
            duration: ex[i].duration,
            date: ex[i].date,
          });
        }
      })
      .then(() => {
        res.json({
          username: usr.username,
          count: myEx.length,
          _id: usr._id,
          log: myEx,
        });
      });
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
