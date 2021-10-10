const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const register = require("./controllers/register");
const signIn = require("./controllers/signin");
const profile = require("./controllers/profile");
const entries = require("./controllers/entries");


const saltRounds = 8;

const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "test",
    database: "smart-brain",
  },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json("ok...");
});

app.post("/signin", signIn.handleSignIn(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt, saltRounds));

app.get("/profile/:id", profile.handleProfile(db));

app.put("/image", entries.handleEntries(db));

app.post("/imageurl", (req,res) => entries.handleApiCall(req,res));

app.listen(3000, () => {
  console.log("App is running on port 3000...");
});
