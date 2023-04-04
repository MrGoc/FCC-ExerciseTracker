require("dotenv").config();
const mongoose = require("mongoose");
const mySecret = process.env["MONGO_URI"];

mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

let exerciseShema = new mongoose.Schema({
  userId: String,
  description: String,
  duration: Number,
  date: String,
  realDate: Date,
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
    realDate: currentDate,
  });

  exercise.save();
  return exercise;
};

const getExercises = async (userId, from, to, limit) => {
  let exercises = Exercise.find({ userId: userId });

  if (from !== undefined) exercises = exercises.gte("realDate", new Date(from));
  if (to !== undefined) exercises = exercises.lte("realDate", new Date(to));
  if (limit !== undefined) exercises = exercises.limit(limit);

  return await exercises.exec();
};

exports.createExercise = createExercise;
exports.getExercises = getExercises;
