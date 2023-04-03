print("Start create users and db");
db = db.getSiblingDB("ExerciseTracker");
/*
db.createUser({
  user: "gs1",
  pwd: "gs1",
  roles: [{ role: "readWrite", db: "admin" }],
});
*/
db.createCollection("users");
db.createCollection("exercise");
print("End create users and db.");
