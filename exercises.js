require("dotenv").config();
const mongoose = require("mongoose");
const mySecret = process.env["MONGO_URI"];

mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

let exerciseShema = new mongoose.Schema({
  userId: String,
  description: String,
  duration: Number,
  date: String,
});

let Exercise = mongoose.model("Exercise", exerciseShema, "exercise");

const createExercise = (userId, description, duration, date) => {
  let currentDate = new Date(date);

  if (date === "") {
    currentDate = new Date(Date.now());
  }

  let exercise = new Exercise({
    userId: userId,
    description: description,
    duration: duration,
    date: currentDate.toDateString(),
  });

  exercise.save();
  return exercise;
};

const getExercises = async (userId) => {
  let exercises = await Exercise.find({ userId: userId }).exec();
  return exercises;
};

exports.createExercise = createExercise;
exports.getExercises = getExercises;
