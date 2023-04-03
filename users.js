require("dotenv").config();
const mongoose = require("mongoose");
const mySecret = process.env["MONGO_URI"];

mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });
/*
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connection Successful!");
});
*/
let userShema = new mongoose.Schema({
  username: String,
});

let User = mongoose.model("User", userShema, "users");

const createUser = (userName) => {
  let user = new User({ username: userName });
  user.save();
  return user;
};

async function getUsers() {
  let users = await User.find({});
  return users;
}

exports.createUser = createUser;
exports.getUsers = getUsers;
